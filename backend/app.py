from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F

app = FastAPI(title="Drug Food Interaction Predictor")

# Enable frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load model
MODEL_PATH = "models"

tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)

model.to(device)
model.eval()

# Labels
label_map = {
    0: "safe",
    1: "neutral",
    2: "unsafe"
}

# Request schema
class PredictRequest(BaseModel):
    drug: str
    food: str

# Home route
@app.get("/")
def home():
    return {"message": "DFI backend is running"}

# Prediction route
@app.post("/predict-interaction")
def predict_interaction(request: PredictRequest):
    text = request.drug.lower() + " [SEP] " + request.food.lower()

    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=64
    )

    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = model(**inputs)

    probs = F.softmax(outputs.logits, dim=1)

    pred = torch.argmax(probs, dim=1).item()
    confidence = probs[0][pred].item()

    return {
        "drug": request.drug,
        "food": request.food,
        "prediction": label_map[pred],
        "confidence": round(confidence, 4)
    }