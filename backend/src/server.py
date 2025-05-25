import os
import sys
from contextlib import asynccontextmanager
from datetime import datetime

import app
from bson import ObjectId
from fastapi import FastAPI, status
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
import uvicorn

from dal import User, UserDAL

MONGODB_URI = os.environ.get("MONGODB_URI")
DEBUG = os.environ.get("DEBUG", "").strip().lower() in {"1", "true", "on", "yes"}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    client = AsyncIOMotorClient(MONGODB_URI)
    database = client.get_default_database()

    # Ensure database is available
    pong = await database.command("ping")
    if int(pong["ok"]) != 1:
        raise Exception("Cluster connection failed")

    users = database.get_collection("users")
    app.user_dal = UserDAL(database.users)

    yield

    client.close()

# Endpoints
@app.get("/user/dummy")
async def get_dummy_user() -> User:
    return User(
        id=str(ObjectId()),
        username="test",
        password_hash="<PASSWORD>",
        created_at=datetime.now(),
    )


# Start server
app = FastAPI(lifespan=lifespan, debug=DEBUG)

def main():
    try:
        uvicorn.run(app, host="0.0.0.0", port=3001, reload=DEBUG)
    except KeyboardInterrupt:
        pass

if __name__ == "__main__":
    main()

