from dotenv import load_dotenv
from fastapi import FastAPI, Request, Query
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
from typing import Optional
import os
from google import genai

app = FastAPI()
load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)
    
@app.get("/api/data")
def get_data(
    search: Optional[str] = Query(None),
    page: int = Query(0),
    pageSize: int = Query(5),
    sortField: Optional[str] = Query(None),
    sortOrder: Optional[str] = Query(None)
):
    sales_reps = DUMMY_DATA.get("salesReps", [])
    if search:
        lower_search = search.lower()
        filtered_reps = [
            rep for rep in sales_reps 
            if lower_search in rep["name"].lower() 
            or lower_search in rep["role"].lower() 
            or lower_search in rep["region"].lower()
        ]
    else:
        filtered_reps = sales_reps
        
    if sortField and sortOrder:
        reverse = sortOrder.lower() == "desc"
        
        def sort_key(rep):
            if sortField == "deals":
                deals = rep.get("deals", [])
                if deals and isinstance(deals, list):
                    return deals[0].get("client", "")
                return ""
            elif sortField == "clients":
                clients = rep.get("clients", [])
                if clients and isinstance(clients, list):
                    return clients[0].get("name", "")
                return ""
            else:
                return rep.get(sortField, "")
        
        filtered_reps = sorted(filtered_reps, key=sort_key, reverse=reverse)
    
    total = len(filtered_reps)
    start = page * pageSize
    end = start + pageSize
    paginated = filtered_reps[start:end]
    
    return {
        "salesReps": paginated,
        "total": total
    }

@app.post("/api/ai")
async def ai_endpoint(request: Request):
    api_key = os.getenv("GOOGLE_GEMINI_API_KEY")
    body = await request.json()
    user_question = body.get("question", "")
    
    client = genai.Client(api_key=api_key)
    
    response = client.models.generate_content(
        model="gemini-2.0-flash", 
        contents=user_question
    )
    
    answer_text = response.text if hasattr(response, "text") else "No answer found."
    
    return {"answer": answer_text}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
