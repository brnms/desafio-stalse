import Link from "next/link";
import { Suspense } from "react";

async function getTickets(search?: string) {
  const url = search 
    ? `http://127.0.0.1:8000/tickets?search=${encodeURIComponent(search)}`
    : "http://127.0.0.1:8000/tickets";
    
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

async function TicketTable({ search }: { search: string }) {
  const tickets = await getTickets(search);

  return (
    <table border={1} cellPadding={8} style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Data</th>
          <th>Cliente</th>
          <th>Canal</th>
          <th>Assunto</th>
          <th>Estado</th>
          <th>Prioridade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket: any) => (
          <tr key={ticket.id}>
            <td>{ticket.id}</td>
            <td>{ticket.created_at}</td>
            <td>{ticket.customer_name}</td>
            <td>{ticket.channel}</td>
            <td>{ticket.subject}</td>
            <td>{ticket.status}</td>
            <td>{ticket.priority}</td>
            <td>
              <Link href={`/tickets/${ticket.id}`}>Ver Detalhes</Link>
            </td>
          </tr>
        ))}
        {tickets.length === 0 && (
          <tr>
            <td colSpan={8} align="center">Nenhum ticket encontrado.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";

  return (
    <div>
      <h1>Lista de Tickets</h1>

      <form method="GET" style={{ marginBottom: "20px" }}>
        <input 
          type="text" 
          name="search" 
          defaultValue={search} 
          placeholder="Pesquisar por cliente ou assunto..." 
        />
        <button type="submit" style={{ marginLeft: "5px" }}>Pesquisar</button>
      </form>

      <Suspense fallback={<div>A carregar tabela de tickets...</div>}>
        <TicketTable search={search} />
      </Suspense>

      <p style={{ marginTop: "20px" }}>
        <a href="/">← Voltar ao início</a>
      </p>
    </div>
  );
}