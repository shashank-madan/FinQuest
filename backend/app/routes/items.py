from fastapi import APIRouter, Depends
from app.database.connection import get_db
from app.models.item import Item

router = APIRouter()

@router.get("/")
async def get_items(db=Depends(get_db)):
    collection = db["items"]
    items = await collection.find().to_list(100)
    return items

@router.post("/")
async def create_item(item: Item, db=Depends(get_db)):
    collection = db["items"]
    result = await collection.insert_one(item.dict())
    return {"inserted_id": str(result.inserted_id)}
