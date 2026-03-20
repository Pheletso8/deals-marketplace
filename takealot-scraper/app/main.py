# app/main.py
import asyncio
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import List
from .scraper import fetch_html_two_load_more, parse_products

app = FastAPI(title="Takealot Scraper Service")

class Product(BaseModel):
    title: str | None
    brand: str | None
    price: str | None
    list_price: str | None
    stock_status: str | None
    estimated_delivery: str | None
    rating: str | None
    reviews: str | None
    link: str | None

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/search", response_model=List[Product])
async def search(query: str = Query(..., min_length=1), headless: bool = True):
    try:
        html = await fetch_html_two_load_more(query, headless=headless)
        products = parse_products(html)
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
