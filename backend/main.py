from fastapi import FastAPI
from backend.routes.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Diyora AI API",
    description="Personalized Career Guidance and Skill Mapping Portal",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Diyora AI!",
        "status": "Backend is running"
    }