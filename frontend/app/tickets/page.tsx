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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Tickets</h1>
          <p className="text-gray-600 text-sm">Visualize, busque e gerencie os chamados do sistema</p>
        </div>

        {/* Form de Busca */}
        <form method="GET" className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Buscar por assunto, cliente..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Tabela de Tickets */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-100 border-b border-gray-200 uppercase text-xs text-gray-600">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Assunto</th>
                <th className="py-3 px-4">Canal</th>
                <th className="py-3 px-4">Prioridade</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    Nenhum ticket encontrado.
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-gray-900">#{ticket.id}</td>
                    <td className="py-3 px-4">{ticket.customer_name || "N/A"}</td>
                    <td className="py-3 px-4 max-w-xs truncate">{ticket.subject}</td>
                    <td className="py-3 px-4 capitalize">{ticket.channel || "Web"}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                          ticket.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : ticket.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                          ticket.status === "closed"
                            ? "bg-green-100 text-green-800"
                            : ticket.status === "in_progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Link
                        href={`/tickets/${ticket.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                      >
                        Ver / Editar
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-500">Carregando lista de tickets...</div>}>
      <TicketsListContent searchParams={searchParams} />
    </Suspense>
  );
}