import json
import os
from fastapi import APIRouter, HTTPException

router = APIRouter(tags=["Metrics"])

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

METRICS_PATH = os.path.join(BASE_DIR, "data", "processed", "metrics.json")


@router.get("/metrics")
def get_metrics():
    if not os.path.exists(METRICS_PATH):
        raise HTTPException(
            status_code=404,
            detail=f"Metrics file not found at: {METRICS_PATH}. Please run the ETL script first.",
        )

    with open(METRICS_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    return data