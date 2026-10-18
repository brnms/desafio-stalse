async function getMetrics() {
  const res = await fetch("http://127.0.0.1:8000/metrics", { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function DashboardPage() {
  const metrics = await getMetrics();

  if (!metrics) {
    return <div>Erro ao carregar as métricas. Certifique-se de que o backend está a correr e o ETL foi executado.</div>;
  }

  return (
    <div>
      <h1>Dashboard de Críticas de Cinema</h1>
      
      <p><strong>Total de Registos:</strong> {metrics.total_records}</p>
      <p><strong>Percentagem de Críticos de Elite:</strong> {metrics.top_critic_percentage}%</p>

      <h2>Resumo de Sentimento</h2>
      <ul>
        <li>Positivos (Fresh): {metrics.sentiment_summary.POSITIVE}</li>
        <li>Negativos (Rotten): {metrics.sentiment_summary.NEGATIVE}</li>
      </ul>

      <h2>Top 5 Filmes</h2>
      <ul>
        {Object.entries(metrics.top_movies || {}).map(([movie, count]) => (
          <li key={movie}>{movie}: {String(count)} avaliações</li>
        ))}
      </ul>

      <h2>Top Críticos</h2>
      <ul>
        {Object.entries(metrics.top_critics || {}).slice(0, 5).map(([critic, count]) => (
          <li key={critic}>{critic}: {String(count)} críticas</li>
        ))}
      </ul>

      <p style={{ marginTop: "20px" }}>
        <a href="/">← Voltar ao início</a>
      </p>
    </div>
  );
}