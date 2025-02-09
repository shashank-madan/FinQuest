from motor.motor_asyncio import AsyncIOMotorClient
from app.config import MONGO_URI, DATABASE_NAME

client = AsyncIOMotorClient(MONGO_URI)
db = client[DATABASE_NAME]

async def init_db():
    """Ensure the collection exists on startup."""
    collection_name = "items"
    
    existing_collections = await db.list_collection_names()
    if collection_name not in existing_collections:
        await db.create_collection(collection_name)
        print(f"✅ Collection '{collection_name}' created.")

async def get_db():
    return db
