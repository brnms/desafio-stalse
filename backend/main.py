from fastapi import FastAPI
from app.routes.tickets import router as tickets_router
from app.routes.metrics import router as metrics_router
from app.storage import init_db

app = FastAPI()

init_db()

app.include_router(tickets_router)
app.include_router(metrics_router)

