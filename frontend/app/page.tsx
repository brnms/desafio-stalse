import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Cyberpunk Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl space-y-8">
        {/* Header Section */}
        <div className="border-b-2 border-yellow-400/80 pb-6">
          <div className="inline-block bg-yellow-400 text-black px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-widest mb-3">
            // SYS_STATUS: ONLINE
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 drop-shadow-[0_2px_10px_rgba(250,204,21,0.3)]">
            Mini Inbox
          </h1>
          <p className="text-neutral-400 text-sm font-mono mt-1 tracking-wide">
            CENTRAL DE OPERAÇÕES E CONTROLE DE TICKETS
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card: Dashboard */}
          <Link
            href="/dashboard"
            className="group relative bg-neutral-900/80 border border-neutral-800 p-6 transition-all duration-300 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(250,204,21,0.2)] hover:-translate-y-1 overflow-hidden"
          >
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-400/10 border-b border-l border-yellow-400/40 group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-300 flex items-center justify-center font-mono text-xs font-bold">
              01
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-amber-500 uppercase tracking-wider font-semibold">
                [ MÉTRICAS & ANALYTICS ]
              </span>
              <h2 className="text-2xl font-bold text-neutral-100 group-hover:text-yellow-400 transition-colors">
                Dashboard
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Visualize os relatórios consolidados do script ETL e métricas de atendimento.
              </p>
            </div>

            <div className="mt-6 flex items-center text-xs font-mono font-bold text-yellow-400 group-hover:translate-x-2 transition-transform duration-300">
              ACESSAR PAINEL <span className="ml-2">→</span>
            </div>
          </Link>

          {/* Card: Tickets */}
          <Link
            href="/tickets"
            className="group relative bg-neutral-900/80 border border-neutral-800 p-6 transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_25px_rgba(251,191,36,0.2)] hover:-translate-y-1 overflow-hidden"
          >
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-amber-400/10 border-b border-l border-amber-400/40 group-hover:bg-amber-400 group-hover:text-black transition-colors duration-300 flex items-center justify-center font-mono text-xs font-bold">
              02
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-yellow-500 uppercase tracking-wider font-semibold">
                [ GERENCIAMENTO DE CHAMADOS ]
              </span>
              <h2 className="text-2xl font-bold text-neutral-100 group-hover:text-amber-400 transition-colors">
                Lista de Tickets
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Consulte, filtre e atualize o status ou a prioridade dos tickets em tempo real.
              </p>
            </div>

            <div className="mt-6 flex items-center text-xs font-mono font-bold text-amber-400 group-hover:translate-x-2 transition-transform duration-300">
              ABRIR TICKETS <span className="ml-2">→</span>
            </div>
          </Link>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-neutral-800/80 flex justify-between items-center text-xs font-mono text-neutral-500">
          <span>STALSE_INBOX v1.0</span>
          <span className="text-yellow-500/80">WEBHOOK_N8N: READY</span>
        </div>
      </div>
    </main>
  );
}