import { Suspense } from "react";
import axios from "axios";
import Link from "next/link";

async function TicketsListContent({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";

  let tickets: any[] = [];
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/tickets?search=${encodeURIComponent(search)}`
    );
    tickets = response.data;
  } catch (err) {
    console.error("Erro ao buscar tickets no backend:", err);
  }

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "open").length;
  const inProgressTickets = tickets.filter(
    (t) => t.status === "in_progress"
  ).length;
  const closedTickets = tickets.filter((t) => t.status === "closed").length;
  const highPriorityTickets = tickets.filter(
    (t) => t.priority === "high"
  ).length;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-4 sm:p-8 font-sans relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-yellow-400/80 pb-4 gap-4">
          <div>
            <div className="inline-block bg-yellow-400 text-black px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-widest mb-2">
              // MODULE: TICKET_MANAGER
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 drop-shadow-[0_2px_10px_rgba(250,204,21,0.3)]">
              Gerenciamento de Tickets
            </h1>
          </div>
          <Link
            href="/"
            className="text-xs font-mono font-bold text-yellow-400 hover:text-yellow-300 border border-yellow-400/40 hover:border-yellow-400 px-4 py-2 transition-all bg-neutral-900/80 shadow-[0_0_10px_rgba(250,204,21,0.1)] hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]"
          >
            ← VOLTAR AO PAINEL
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="bg-neutral-900/80 border border-neutral-800 p-4 relative overflow-hidden">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
              TOTAL TICKETS
            </span>
            <div className="text-3xl font-black font-mono text-neutral-100 mt-1">
              {totalTickets}
            </div>
          </div>

          <div className="bg-neutral-900/80 border border-neutral-800 p-4 relative overflow-hidden">
            <span className="text-[10px] font-mono text-yellow-500 uppercase tracking-wider">
              ABERTOS
            </span>
            <div className="text-3xl font-black font-mono text-yellow-400 mt-1">
              {openTickets}
            </div>
          </div>

          <div className="bg-neutral-900/80 border border-neutral-800 p-4 relative overflow-hidden">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">
              EM ANDAMENTO
            </span>
            <div className="text-3xl font-black font-mono text-blue-400 mt-1">
              {inProgressTickets}
            </div>
          </div>

          <div className="bg-neutral-900/80 border border-neutral-800 p-4 relative overflow-hidden">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
              FECHADOS
            </span>
            <div className="text-3xl font-black font-mono text-emerald-400 mt-1">
              {closedTickets}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-neutral-900/80 border border-amber-500/40 p-4 relative overflow-hidden shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider font-bold">
              PRIORIDADE ALTA
            </span>
            <div className="text-3xl font-black font-mono text-amber-400 mt-1">
              {highPriorityTickets}
            </div>
          </div>
        </div>

        <div className="bg-neutral-900/90 border border-neutral-800 p-4">
          <form method="GET" className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Buscar por assunto, cliente..."
                className="w-full bg-neutral-950 border border-neutral-800 px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-yellow-400 font-mono transition-colors"
              />
              <span className="absolute right-3 top-2.5 text-xs font-mono text-neutral-500">
                [SEARCH]
              </span>
            </div>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-mono font-bold text-xs px-6 py-2.5 transition-colors uppercase tracking-wider"
            >
              Buscar
            </button>
          </form>
        </div>

        <div className="bg-neutral-900/80 border border-neutral-800 overflow-x-auto">
          {tickets.length === 0 ? (
            <div className="p-12 text-center font-mono text-neutral-500">
              NENHUM TICKET ENCONTRADO.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-950/60 font-mono text-xs text-neutral-400 uppercase tracking-wider">
                  <th className="p-4">ID</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Assunto</th>
                  <th className="p-4">Canal</th>
                  <th className="p-4">Prioridade</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-sm font-sans">
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="hover:bg-neutral-800/30 transition-colors group"
                  >
                    <td className="p-4 font-mono font-bold text-yellow-500 text-xs">
                      #{ticket.id}
                    </td>

                    <td className="p-4 font-semibold text-neutral-200">
                      {ticket.customer_name || "N/A"}
                    </td>

                    <td className="p-4 text-neutral-300 max-w-xs truncate">
                      {ticket.subject}
                    </td>

                    <td className="p-4 font-mono text-xs text-neutral-400 uppercase">
                      {ticket.channel || "Web"}
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider border ${
                          ticket.priority === "high"
                            ? "bg-amber-950/80 text-amber-400 border-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                            : ticket.priority === "medium"
                            ? "bg-neutral-800 text-neutral-300 border-neutral-700"
                            : "bg-neutral-900 text-neutral-500 border-neutral-800"
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider border ${
                          ticket.status === "closed"
                            ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/40"
                            : ticket.status === "in_progress"
                            ? "bg-blue-950/60 text-blue-400 border-blue-500/40"
                            : "bg-yellow-950/60 text-yellow-400 border-yellow-500/40"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <Link
                        href={`/tickets/${ticket.id}`}
                        className="font-mono text-xs text-yellow-400 hover:text-yellow-300 hover:underline"
                      >
                        [VER / EDITAR]
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="pt-2 flex justify-between items-center text-xs font-mono text-neutral-500">
          <span>TICKETS EXIBIDOS: {tickets.length}</span>
          <span className="text-yellow-500/80">SYSTEM_TICKETS: ONLINE</span>
        </div>
      </div>
    </main>
  );
}

export default function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center font-mono text-yellow-400 animate-pulse">
          // A CARREGAR LISTA DE TICKETS...
        </div>
      }
    >
      <TicketsListContent searchParams={searchParams} />
    </Suspense>
  );
}