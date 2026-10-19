"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface MetricsData {
  total_records: number;
  sentiment_summary: {
    POSITIVE: number;
    NEGATIVE: number;
  };
  review_state_summary: {
    fresh: number;
    rotten: number;
  };
  top_movies: Record<string, number>;
  top_publications: Record<string, number>;
  top_critics: Record<string, number>;
  top_critic_percentage: number;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    axios
      .get(`${API_URL}/metrics`)
      .then((response) => {
        setMetrics(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar métricas:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-4 sm:p-8 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-yellow-400/80 pb-4 gap-4">
          <div>
            <div className="inline-block bg-yellow-400 text-black px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-widest mb-2">
              // MODULE: ETL_METRICS_ANALYTICS
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 drop-shadow-[0_2px_10px_rgba(250,204,21,0.3)]">
              Dashboard de Métricas
            </h1>
          </div>
          <Link
            href="/"
            className="text-xs font-mono font-bold text-yellow-400 hover:text-yellow-300 border border-yellow-400/40 hover:border-yellow-400 px-4 py-2 transition-all bg-neutral-900/80 shadow-[0_0_10px_rgba(250,204,21,0.1)] hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]"
          >
            ← VOLTAR AO PAINEL
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center font-mono text-yellow-400 animate-pulse">
            // A CARREGAR MÉTRICAS DO SISTEMA...
          </div>
        ) : !metrics ? (
          <div className="p-12 text-center font-mono text-neutral-500">
            FALHA AO OBTER DADOS DO ENDPOINT DE MÉTRICAS.
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cards Superiores (Resumo) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-neutral-900/80 border border-neutral-800 p-6 relative overflow-hidden group hover:border-yellow-400/50 transition-colors">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  TOTAL DE REGISTROS
                </span>
                <div className="text-3xl font-black font-mono text-neutral-100 mt-2">
                  {metrics.total_records?.toLocaleString()}
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-neutral-800 p-6 relative overflow-hidden group hover:border-emerald-400/50 transition-colors">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  SENTIMENTO POSITIVO / FRESH
                </span>
                <div className="text-3xl font-black font-mono text-emerald-400 mt-2">
                  {metrics.sentiment_summary?.POSITIVE?.toLocaleString()}
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-neutral-800 p-6 relative overflow-hidden group hover:border-red-400/50 transition-colors">
                <span className="text-xs font-mono text-red-400 uppercase tracking-wider">
                  SENTIMENTO NEGATIVO / ROTTEN
                </span>
                <div className="text-3xl font-black font-mono text-red-400 mt-2">
                  {metrics.sentiment_summary?.NEGATIVE?.toLocaleString()}
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-amber-500/40 p-6 relative overflow-hidden shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                <span className="text-xs font-mono text-amber-500 uppercase tracking-wider font-bold">
                  % CRÍTICOS TOP
                </span>
                <div className="text-3xl font-black font-mono text-amber-400 mt-2">
                  {metrics.top_critic_percentage}%
                </div>
              </div>
            </div>

            {/* Listas e Tabelas de Métricas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Filmes */}
              <div className="bg-neutral-900/80 border border-neutral-800 p-6 space-y-4">
                <h2 className="text-sm font-mono font-bold text-yellow-400 uppercase tracking-wider border-b border-neutral-800 pb-2">
                  // TOP FILMES MAIS AVALIADOS
                </h2>
                <div className="space-y-3 font-mono text-xs">
                  {Object.entries(metrics.top_movies || {}).map(
                    ([movie, count], idx) => (
                      <div
                        key={movie}
                        className="flex justify-between items-center bg-neutral-950 p-3 border border-neutral-800/80"
                      >
                        <span className="text-neutral-300">
                          <strong className="text-yellow-500 mr-2">
                            0{idx + 1}.
                          </strong>
                          {movie}
                        </span>
                        <span className="text-amber-400 font-bold bg-amber-950/40 px-2 py-0.5 border border-amber-500/30">
                          {count} reviews
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Top Críticos */}
              <div className="bg-neutral-900/80 border border-neutral-800 p-6 space-y-4">
                <h2 className="text-sm font-mono font-bold text-yellow-400 uppercase tracking-wider border-b border-neutral-800 pb-2">
                  // TOP CRÍTICOS COM MAIS AVALIAÇÕES
                </h2>
                <div className="space-y-3 font-mono text-xs">
                  {Object.entries(metrics.top_critics || {}).map(
                    ([critic, count], idx) => (
                      <div
                        key={critic}
                        className="flex justify-between items-center bg-neutral-950 p-3 border border-neutral-800/80"
                      >
                        <span className="text-neutral-300">
                          <strong className="text-yellow-500 mr-2">
                            0{idx + 1}.
                          </strong>
                          {critic}
                        </span>
                        <span className="text-yellow-400 font-bold bg-yellow-950/40 px-2 py-0.5 border border-yellow-500/30">
                          {count?.toLocaleString()} reviews
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 flex justify-between items-center text-xs font-mono text-neutral-500">
          <span>ETL ENGINE: PANDAS / JSON GENERATED</span>
          <span className="text-yellow-500/80">SYSTEM_METRICS: ONLINE</span>
        </div>
      </div>
    </main>
  );
}