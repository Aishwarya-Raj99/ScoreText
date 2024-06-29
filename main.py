from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from transformers import pipeline
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

# Initialize FastAPI
app = FastAPI()

# Database setup
DATABASE_URL = "sqlite:///./test.db"
Base = declarative_base()
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class ScoringResult(Base):
    __tablename__ = "scoring_results"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, index=True)
    vectara_score = Column(Float)
    toxicity_score = Column(Float)

Base.metadata.create_all(bind=engine)

# Models from HuggingFace
vectara_model = pipeline('text-classification', model='vectara/hallucination_evaluation_model')
toxicity_model = pipeline('text-classification', model='unitary/toxic-bert')

class TextInput(BaseModel):
    text: str

@app.post("/score/")
async def score_text(text_input: TextInput):
    text = text_input.text
    try:
        vectara_result = vectara_model(text)
        toxicity_result = toxicity_model(text)
        vectara_score = vectara_result[0]['score']
        toxicity_score = toxicity_result[0]['score']
        
        # Save to database
        db = SessionLocal()
        result = ScoringResult(text=text, vectara_score=vectara_score, toxicity_score=toxicity_score)
        db.add(result)
        db.commit()
        db.refresh(result)
        
        return {"id": result.id, "text": text, "vectara_score": vectara_score, "toxicity_score": toxicity_score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/delete/{id}")
async def delete_result(id: int):
    try:
        db = SessionLocal()
        result = db.query(ScoringResult).filter(ScoringResult.id == id).first()
        if not result:
            raise HTTPException(status_code=404, detail="Item not found")
        db.delete(result)
        db.commit()
        return {"detail": "Deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/results/")
async def get_results():
    db = SessionLocal()
    results = db.query(ScoringResult).all()
    return results

# Setting up templates
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    db = SessionLocal()
    results = db.query(ScoringResult).all()
    return templates.TemplateResponse("index.html", {"request": request, "results": results})
