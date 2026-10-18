import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Mini Inbox - Painel Principal</h1>
      <ul>
        <li>
          <Link href="/dashboard">Ir para o Dashboard (Métricas)</Link>
        </li>
        <li>
          <Link href="/tickets">Ir para a Lista de Tickets</Link>
        </li>
      </ul>
    </div>
  );
}