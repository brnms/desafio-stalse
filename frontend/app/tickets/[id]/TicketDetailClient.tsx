"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TicketDetailClient({ id }: { id: string }) {
  const router = useRouter();
  
  const [ticket, setTicket] = useState<any>(null);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/tickets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTicket(data);
        setStatus(data.status);
        setPriority(data.priority);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch(`http://127.0.0.1:8000/tickets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, priority }),
    });

    if (res.ok) {
      alert("Ticket atualizado com sucesso!");
      router.refresh();
    } else {
      alert("Erro ao atualizar o ticket.");
    }
  };

  if (loading) return <div>A carregar detalhes...</div>;
  if (!ticket) return <div>Ticket não encontrado.</div>;

  return (
    <div>
      <h1>Detalhes do Ticket #{ticket.id}</h1>
      
      <p><strong>Data de Criação:</strong> {ticket.created_at}</p>
      <p><strong>Nome do Cliente:</strong> {ticket.customer_name}</p>
      <p><strong>Canal:</strong> {ticket.channel}</p>
      <p><strong>Assunto:</strong> {ticket.subject}</p>

      <form onSubmit={handleUpdate} style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px", width: "300px" }}>
        <h3>Atualizar Ticket</h3>
        
        <div style={{ marginBottom: "10px" }}>
          <label>Estado: </label><br />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="open">open</option>
            <option value="in_progress">in_progress</option>
            <option value="closed">closed</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Prioridade: </label><br />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </div>

        <button type="submit">Guardar Alterações</button>
      </form>

      <p style={{ marginTop: "20px" }}>
        <a href="/tickets">← Voltar para a lista de tickets</a>
      </p>
    </div>
  );
}