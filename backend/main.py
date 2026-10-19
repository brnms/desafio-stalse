from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.routes.tickets import router as tickets_router
from backend.app.routes.metrics import router as metrics_router
from backend.app.storage import init_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Para ambiente de desenvolvimento/MVP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

app.include_router(tickets_router)
app.include_router(metrics_router)

