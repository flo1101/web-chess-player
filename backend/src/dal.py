from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorCollection
from pymongo import ReturnDocument
from datetime import datetime

from pydantic import BaseModel

from uuid import uuid4

class User(BaseModel):
    id: str
    email: str
    username: str
    password_hash: str
    created_at: datetime

class UserDAL:
    def __init__(self, collection: AsyncIOMotorCollection):
        self.collection = collection

    async def create_user(self, username: str, email: str, password: str):
        # Check if username is free
        # Check if email is free
        # Check if password is strong enough
        # Hash the password
        password_hash = password

        return User(
            id=str(ObjectId()),
            username=username,
            email=email,
            password_hash=password_hash,
            created_at=datetime.now(),
        )

"""
Holds information about a chess game in PGN format plus additional metadata.

Example a game in PGN format:

[Event "Casual Game"]
[Site "https://example.com"]
[Date "2025.05.15"]
[Round "-"]
[White "alice"]
[Black "bob"]
[Result "1-0"]
[ECO "C20"]
[Opening "King's Pawn Game"]
[TimeControl "300+0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 1-0

"""
class Game(BaseModel):
    id: str
    white: str
    black   : str
    pgn: str # Game information
    init_fen: str # Position on game start
    curr_fen: str # Current game position
    status: str # 'ongoing', 'checkmate', 'draw', 'resigned', 'canceled'
    winner: str | None
    created_at: datetime
    created_by: datetime