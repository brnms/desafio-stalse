from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class TicketStatus(str, Enum):
    open = "open"
    in_progress = "in_progress"
    closed = "closed"


class TicketPriority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class TicketResponse(BaseModel):
    id: int
    created_at: str
    customer_name: str
    channel: str
    subject: str
    status: TicketStatus
    priority: TicketPriority

    class Config:
        from_attributes = True


class TicketUpdate(BaseModel):
    status: Optional[TicketStatus] = None
    priority: Optional[TicketPriority] = None