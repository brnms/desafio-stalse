import { Suspense } from "react";
import TicketDetailClient from "./TicketDetailClient";

async function TicketParamsWrapper({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <TicketDetailClient id={resolvedParams.id} />;
}

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div>A carregar detalhes do ticket...</div>}>
      <TicketParamsWrapper params={params} />
    </Suspense>
  );
}