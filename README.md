# Drug-Food Interaction Predictor

A full-stack application that predicts interactions between drugs and food using machine learning.

## Project Structure

```
.
├── backend/
│   ├── app.py                 # FastAPI backend
│   └── models/                # ML model files
│       ├── config.json
│       ├── drug_food_interactions.csv
│       ├── model.safetensors
│       ├── tokenizer_config.json
│       └── tokenizer.json
├── frontend/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── assets/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── requirements.txt           # Python dependencies
├── README.md                  # This file
└── .gitignore                 # Git ignore rules
```

## Setup

### Backend

1. Create a virtual environment:
   ```bash
   python -m venv .venv
   ```

2. Activate the virtual environment:
   - Windows: `.venv\Scripts\activate`
   - Linux/Mac: `source .venv/bin/activate`

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend:
   ```bash
   uvicorn backend.app:app --reload
   ```

### Frontend

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend:
   ```bash
   npm run dev
   ```

## Usage

1. Start the backend server
2. Start the frontend development server
3. Open the frontend in your browser
4. Enter a drug name and food item
5. Click "Predict Interaction" to get the result

## API

- `GET /` - Health check
- `POST /predict-interaction` - Predict drug-food interaction

Request body for prediction:
```json
{
  "drug": "aspirin",
  "food": "grapefruit"
}
```

Response:
```json
{
  "drug": "aspirin",
  "food": "grapefruit",
  "prediction": "unsafe",
  "confidence": 0.95
}
```