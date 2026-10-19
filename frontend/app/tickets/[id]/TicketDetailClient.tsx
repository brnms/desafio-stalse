"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function TicketDetailClient({ id }: { id: string }) {
  const router = useRouter();

  const [ticket, setTicket] = useState<any>(null);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/tickets/${id}`)
      .then((response) => {
        const data = response.data;
        setTicket(data);
        setStatus(data.status);
        setPriority(data.priority);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar o ticket:", err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await axios.patch(`http://127.0.0.1:8000/tickets/${id}`, {
        status,
        priority,
      });

      alert("Ticket atualizado com sucesso!");
      setUpdating(false);
      router.refresh();
    } catch (err) {
      console.error("Erro ao atualizar o ticket:", err);
      alert("Erro ao atualizar o ticket. Verifique a conexão com o backend.");
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6 text-gray-500">Carregando dados do ticket #{id}...</div>;
  }

  if (!ticket) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-red-500 mb-4">Ticket não encontrado.</p>
        <Link href="/tickets" className="text-blue-600 hover:underline">
          ← Voltar para a lista
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/tickets" className="text-sm text-blue-600 hover:underline">
          ← Voltar para a lista de tickets
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">
          Ticket #{ticket.id}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Detalhes do Ticket */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
          <div>
            <span className="text-xs font-bold uppercase text-gray-400">Assunto</span>
            <p className="text-lg font-semibold text-gray-800">{ticket.subject}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div>
              <span className="text-xs font-bold uppercase text-gray-400">Cliente</span>
              <p className="text-sm font-medium text-gray-700">{ticket.customer_name || "Não informado"}</p>
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-gray-400">Canal</span>
              <p className="text-sm font-medium text-gray-700 capitalize">{ticket.channel || "Web"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div>
              <span className="text-xs font-bold uppercase text-gray-400">Data de Criação</span>
              <p className="text-sm text-gray-600">{ticket.created_at || "N/A"}</p>
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-gray-400">Última Atualização</span>
              <p className="text-sm text-gray-600">{ticket.updated_at || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Formulário de Edição */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
            Editar Status/Prioridade
          </h2>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="open font-medium">open</option>
                <option value="in_progress font-medium">in_progress</option>
                <option value="closed font-medium">closed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prioridade
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {updating ? "Salvando..." : "Salvar Alterações"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}