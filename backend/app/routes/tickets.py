from typing import List, Optional
from ..storage import TicketModel, get_db
from ..schemas import TicketResponse, TicketUpdate
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
import requests

router = APIRouter(prefix="/tickets", tags=["Tickets"])

N8N_WEBHOOK_URL = (
    "http://localhost:5678/webhook-test/e406ee05-7402-4774-8144-12fda9b9f760"
)


@router.get("", response_model=List[TicketResponse])
def list_tickets(
    search: Optional[str] = Query(
        None, description="Filtro por nome do cliente ou assunto"
    ),
    db: Session = Depends(get_db),
):
    query = db.query(TicketModel)
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (TicketModel.customer_name.ilike(search_term))
            | (TicketModel.subject.ilike(search_term))
        )
    return query.all()


@router.get("/{ticket_id}", response_model=TicketResponse)
def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = db.query(TicketModel).filter(TicketModel.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket


@router.patch("/{ticket_id}", response_model=TicketResponse)
def update_ticket(
    ticket_id: int, payload: TicketUpdate, db: Session = Depends(get_db)
):
    ticket = db.query(TicketModel).filter(TicketModel.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    if payload.status is not None:
        ticket.status = payload.status
    if payload.priority is not None:
        ticket.priority = payload.priority

    db.commit()
    db.refresh(ticket)

    if ticket.status == "closed" or ticket.priority == "high":
        payload_data = {
            "id": ticket.id,
            "customer_name": getattr(ticket, "customer_name", "N/A"),
            "subject": getattr(ticket, "subject", "N/A"),
            "status": ticket.status,
            "priority": ticket.priority,
        }
        try:
            requests.post(N8N_WEBHOOK_URL, json=payload_data, timeout=3)
        except Exception as e:
            print(f"⚠️ Aviso: Falha ao enviar webhook para o n8n: {e}")

    return ticket