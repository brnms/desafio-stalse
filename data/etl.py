import json
import os
import pandas as pd

RAW_DATA_PATH = "data/raw/movie_reviews.csv"
PROCESSED_DIR = "data/processed"
OUTPUT_METRICS_PATH = os.path.join(PROCESSED_DIR, "metrics.json")


def run_etl():
    print("🔄 Starting ETL process for Movie Reviews dataset...")

    if not os.path.exists(RAW_DATA_PATH):
        raise FileNotFoundError(f"Raw dataset not found at '{RAW_DATA_PATH}'.")

    df = pd.read_csv(RAW_DATA_PATH)

    # 1. Basic Metrics
    total_reviews = int(len(df))

    # 2. Sentiment & State Summaries
    sentiment_summary = (
        df["scoreSentiment"].value_counts().to_dict()
        if "scoreSentiment" in df.columns
        else {}
    )
    review_state_summary = (
        df["reviewState"].value_counts().to_dict()
        if "reviewState" in df.columns
        else {}
    )

    # 3. Top Movies (using 'id' as movie identifier)[cite: 1]
    top_movies = (
        df["id"].value_counts().head(5).to_dict() if "id" in df.columns else {}
    )

    # 4. Extra Advanced Metrics
    # Top Publications[cite: 1]
    top_publications = (
        df["publicationName"].value_counts().head(5).to_dict()
        if "publicationName" in df.columns
        else {}
    )

    # Top Critics[cite: 1]
    top_critics = (
        df["criticName"].value_counts().head(5).to_dict()
        if "criticName" in df.columns
        else {}
    )

    # Top Critics Percentage (isTopCritic)[cite: 1]
    top_critic_count = (
        int(df["isTopCritic"].sum())
        if "isTopCritic" in df.columns
        else 0
    )
    top_critic_ratio = (
        round((top_critic_count / total_reviews) * 100, 2)
        if total_reviews > 0
        else 0
    )

    # Assembling final metrics payload
    metrics_payload = {
        "total_records": total_reviews,
        "sentiment_summary": sentiment_summary,
        "review_state_summary": review_state_summary,
        "top_movies": top_movies,
        "top_publications": top_publications,
        "top_critics": top_critics,
        "top_critic_percentage": top_critic_ratio,
    }

    os.makedirs(PROCESSED_DIR, exist_ok=True)
    with open(OUTPUT_METRICS_PATH, "w", encoding="utf-8") as f:
        json.dump(metrics_payload, f, ensure_ascii=False, indent=2)

    print(f"✅ ETL completed successfully! Output saved to: {OUTPUT_METRICS_PATH}")


if __name__ == "__main__":
    run_etl()