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
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center font-mono text-yellow-400 animate-pulse">
        // A CARREGAR DADOS DO TICKET #{id}...
      </div>
    );
  }

  if (!ticket) {
    return (
      <main className="min-h-screen bg-neutral-950 text-neutral-100 p-4 sm:p-8 font-sans relative overflow-hidden flex flex-col items-center justify-center">
        <div className="bg-neutral-900 border border-neutral-800 p-8 text-center space-y-4 max-w-md w-full">
          <p className="font-mono text-amber-500 uppercase">
            // TICKET NÃO ENCONTRADO
          </p>
          <Link
            href="/tickets"
            className="inline-block text-xs font-mono font-bold text-yellow-400 border border-yellow-400/40 hover:border-yellow-400 px-4 py-2 transition-all bg-neutral-950"
          >
            ← VOLTAR PARA A LISTA
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-4 sm:p-8 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-yellow-400/80 pb-4 gap-4">
          <div>
            <div className="inline-block bg-yellow-400 text-black px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-widest mb-2">
              // MODULE: TICKET_DETAIL
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 drop-shadow-[0_2px_10px_rgba(250,204,21,0.3)]">
              Ticket #{ticket.id}
            </h1>
          </div>
          <Link
            href="/tickets"
            className="text-xs font-mono font-bold text-yellow-400 hover:text-yellow-300 border border-yellow-400/40 hover:border-yellow-400 px-4 py-2 transition-all bg-neutral-900/80 shadow-[0_0_10px_rgba(250,204,21,0.1)] hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]"
          >
            ← VOLTAR À LISTA
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-neutral-900/80 border border-neutral-800 p-6 space-y-6">
            <div>
              <span className="text-xs font-mono text-yellow-500 uppercase tracking-wider block mb-1">
                // ASSUNTO DO TICKET
              </span>
              <p className="text-lg font-bold text-neutral-100 font-sans">
                {ticket.subject}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
              <div className="bg-neutral-950 p-4 border border-neutral-800/80">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">
                  CLIENTE
                </span>
                <p className="text-sm font-bold text-neutral-200">
                  {ticket.customer_name || "Não informado"}
                </p>
              </div>
              <div className="bg-neutral-950 p-4 border border-neutral-800/80">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">
                  CANAL
                </span>
                <p className="text-sm font-bold text-neutral-300 uppercase font-mono">
                  {ticket.channel || "Web"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-neutral-950 p-4 border border-neutral-800/80">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">
                  DATA DE CRIAÇÃO
                </span>
                <p className="text-xs font-mono text-neutral-400">
                  {ticket.created_at || "N/A"}
                </p>
              </div>
              <div className="bg-neutral-950 p-4 border border-neutral-800/80">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">
                  ÚLTIMA ATUALIZAÇÃO
                </span>
                <p className="text-xs font-mono text-neutral-400">
                  {ticket.updated_at || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/80 border border-neutral-800 p-6 space-y-4">
            <h2 className="text-sm font-mono font-bold text-yellow-400 uppercase tracking-wider border-b border-neutral-800 pb-3">
              // EDITAR STATUS / PRIORIDADE
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-neutral-100 focus:outline-none focus:border-yellow-400 font-mono transition-colors"
                >
                  <option value="open">open</option>
                  <option value="in_progress">in_progress</option>
                  <option value="closed">closed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Prioridade
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-neutral-100 focus:outline-none focus:border-yellow-400 font-mono transition-colors"
                >
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="high">high</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={updating}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-mono font-bold text-xs py-3 transition-colors uppercase tracking-wider disabled:opacity-50 mt-2 shadow-[0_0_15px_rgba(250,204,21,0.2)]"
              >
                {updating ? "A SALVAR..." : "Salvar Alterações"}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-2 flex justify-between items-center text-xs font-mono text-neutral-500">
          <span>TICKET_ID: #{ticket.id}</span>
          <span className="text-yellow-500/80">SYSTEM_UPDATE: READY</span>
        </div>
      </div>
    </main>
  );
}