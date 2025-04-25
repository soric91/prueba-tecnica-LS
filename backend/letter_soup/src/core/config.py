from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file="../../.env",  # ajusta según tu estructura realbackend/letter_soup/src/core/config.py
        env_file_encoding="utf-8"
    )

    # PostgreSQL
    HOSTSERVER: str
    PORTSERVER: int = 5432
    USERDB: str
    PASSWORDDB: str
    DATABASE: str
    
    # FastAPI
    HOSTAPI: str = "0.0.0.0"
    PORTAPI: int = 8880
    LEVEL_LOG: str = "info"
    WORKERS: int = 2
    


    @property
    def sqlalchemy_uri(self) -> str:
        return (
            f"postgresql://{self.USERDB}:{self.PASSWORDDB}"
            f"@{self.HOSTSERVER}:{self.PORTSERVER}/{self.DATABASE}"
        )


load_dotenv(".env", override=True)
settings = Settings()