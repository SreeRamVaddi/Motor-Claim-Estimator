from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse

app = FastAPI(title="Motor Claim Estimator Backend", version="0.1.0")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    # Placeholder: In future, run CV/LLM pipeline here
    # For now, echo back a mock detection result
    return {
        "filename": file.filename,
        "detected_parts": [
            {"part": "front_bumper", "severity": "medium"},
            {"part": "left_headlight", "severity": "low"},
        ],
    }


@app.post("/estimate")
async def estimate_cost(payload: dict):
    # Placeholder: compute cost from detected parts
    parts = payload.get("detected_parts", [])
    base_costs = {"front_bumper": 300, "left_headlight": 150}
    labor_per_part = 80
    total = 0
    breakdown = []
    for item in parts:
        part = item.get("part")
        part_cost = base_costs.get(part, 100)
        labor = labor_per_part
        subtotal = part_cost + labor
        total += subtotal
        breakdown.append({"part": part, "parts_cost": part_cost, "labor": labor, "subtotal": subtotal})
    return {"currency": "USD", "total": total, "breakdown": breakdown}


@app.get("/")
def root():
    return JSONResponse(
        {
            "message": "Motor Claim Estimator Backend",
            "endpoints": ["/health", "/analyze", "/estimate"],
        }
    )

