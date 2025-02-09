from fastapi import FastAPI
from app.database.connection import init_db
from app.routes import items

app = FastAPI()

@app.on_event("startup")
async def startup_db():
    await init_db()

app.include_router(items.router, prefix="/items")

@app.get("/")
async def root():
    return {"message": "FastAPI with MongoDB"}
