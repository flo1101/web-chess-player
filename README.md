# ♟️ Online chess application

A full-stack chess web application built with modern technologies, served as an out-of-the-box Docker application. Supports live gameplay, move validation, game state tracking, and optional AI opponent using Stockfish.

---

## 🚀 Features

- ✔ Clean and responsive chessboard UI
- ✔ REST API backend with FastAPI
- ✔ Dockerized for easy deployment
- ✔ Move validation and game rules enforcement (legal moves, check, checkmate, etc.)
- ✘ Import of games in FEN and PGN format
- ✘ Play live chess games against other users
- ✘ Play against AI powered by Stockfish

---

## 🛠️ Technologies

### Frontend
- **React** – Frontend framework
- **react-chessboard** – Chess board UI

### Backend
- **FastAPI** – High-performance Python web framework
- **python-chess** – Chess rules engine (move validation, FEN/PGN support, board state)
- **Stockfish** – Optional AI chess engine (via UCI protocol)

### Database
- **MongoDB** – Stores users, games, and game history

### DevOps
- **Docker** – Containerized services
- **Docker Compose** – Multi-service orchestration

---

## 📦 Installation

### Prerequisites
- Docker + Docker Compose installed

### Clone and Run
```bash
git clone https://github.com/yourusername/chess-clone.git
cd chess-clone
docker-compose up --build
