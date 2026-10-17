from fastapi import FastAPI

app = FastAPI()

tickets = [
    {"id": 1, "name": "ticket One"},
    {"id": 2, "name": "ticket Two"},
    {"id": 3, "name": "ticket Three"},
]


@app.get("/tickets")
def get_tickets():
    return tickets

@app.get("/tickets/{ticket_id}")
def get_ticket(ticket_id: int):
    for ticket in tickets:
        if ticket["id"] == ticket_id:
            return ticket
    return {"error": "ticket not found"}


@app.post("/tickets")
def create_ticket(ticket: dict):
    tickets.append(ticket)
    return ticket 