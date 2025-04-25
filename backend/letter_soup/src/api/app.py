from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from src.api.routes import app_routes
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(  title="Mi API de prueba técnica",
    version="1.0.0",
    docs_url="/docs",           
    redoc_url="/redoc",          
    openapi_url="/openapi.json" )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

app.include_router(app_routes.router)




