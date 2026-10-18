import json
import os
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Caminho absoluto para o banco SQLite dentro de /backend
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'db.sqlite')}"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class TicketModel(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(String, index=True)
    customer_name = Column(String, index=True)
    channel = Column(String)
    subject = Column(String)
    status = Column(String, default="open")
    priority = Column(String, default="medium")


def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Se a tabela estiver vazia, carrega as seeds do JSON
    if db.query(TicketModel).count() == 0:
        seeds_path = os.path.join(BASE_DIR, "seeds", "tickets.json")
        if os.path.exists(seeds_path):
            with open(seeds_path, "r", encoding="utf-8") as f:
                tickets_data = json.load(f)
                for item in tickets_data:
                    ticket = TicketModel(
                        created_at=item.get("created_at"),
                        customer_name=item.get("customer_name"),
                        channel=item.get("channel"),
                        subject=item.get("subject"),
                        status=item.get("status", "open"),
                        priority=item.get("priority", "medium"),
                    )
                    db.add(ticket)
                db.commit()
    db.close()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()