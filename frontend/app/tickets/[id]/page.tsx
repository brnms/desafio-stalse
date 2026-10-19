import { Suspense } from "react";
import TicketDetailClient from "./TicketDetailClient";

async function TicketDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <TicketDetailClient id={resolvedParams.id} />;
}

export default function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-500">Carregando detalhes do ticket...</div>}>
      <TicketDetailContent params={params} />
    </Suspense>
  );
}