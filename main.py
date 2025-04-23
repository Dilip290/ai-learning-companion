from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

student_data = {}

@app.post("/submit-interaction")
def submit_interaction(name: str = Form(...), subject: str = Form(...), score: int = Form(...)):
    student_data[name] = {"subject": subject, "score": score}
    return {"message": "Data submitted successfully"}

@app.get("/get-recommendation")
def get_recommendation(name: str):
    if name not in student_data:
        return {"error": "No data for this student"}
    
    score = student_data[name]["score"]
    if score < 50:
        level = "Foundational"
    elif score < 75:
        level = "Intermediate"
    else:
        level = "Advanced"
        
    return {
        "name": name,
        "subject": student_data[name]["subject"],
        "recommended_level": level
    }
