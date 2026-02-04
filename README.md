# SymptoCare (MediSearch AI)

Lightweight educational project to help identify likely conditions from user symptoms and suggest medicines from an offline medicines database.

## Quick summary

- Backend: Flask + SQLAlchemy, exposes a diagnosis endpoint and a medicine-search endpoint (text or image OCR).
- ML: scikit-learn pipeline saved at `backend/models/uses_model.pkl` predicts a `uses` label from free-text symptoms.
- Frontend: React + Vite + TypeScript UI under `frontend/` (search UI, chatbot, simple pages).
- Database: MySQL expected for the medicines table (SQLAlchemy model in `backend/medicine_model.py`). A small JSON stub `backend/medicine_db.json` is included for examples.

## Repo layout

- backend/
  - app.py                      - Flask application and HTTP endpoints
  - medicine_model.py           - SQLAlchemy model mapping to `medicines` table
  - ml_model.py                 - helper to load `models/uses_model.pkl` and expose `predict_disease()`
  - train_uses_model.py         - training script to create the scikit-learn pipeline
  - models/uses_model.pkl       - trained model (binary, joblib)
  - services/medicine_service.py- DB query logic: `search_by_uses()` helper
  - data/Symptoms.csv           - training CSV used by `train_uses_model.py`
  - medicine_db.json            - small JSON test DB example

- frontend/
  - package.json                - frontend dependencies & scripts (vite)
  - src/                        - React + TypeScript source
    - components/               - UI components (MedicineSearch, Chatbot, etc.)
    - App.tsx                   - router + app layout
    - types/                    - TypeScript interfaces used by the UI

- dataset/                      - various CSV dataset files used for development/training

## Backend — endpoints

1. Health check
   - GET / -> returns { "status": "ok" }

2. Predict disease (used by chatbot)
   - POST /predict
   - Content-Type: application/json
   - Body: { "symptoms": "fever cough headache" }
   - Response: { "disease": <label>, "medicines": [ ... ], "disclaimer": "..." }

3. Search medicine by name or image
   - POST /api/search-medicine
   - form-data: either `name` (text) OR `image` (file upload image of medicine strip)
   - Uses OCR (pytesseract) when `image` is provided and returns medicine details from the MySQL database

Notes:
- Medicine SQLAlchemy model is defined in `backend/medicine_model.py` and maps to a table named `medicines`.
- `backend/services/medicine_service.py` contains `search_by_uses(disease, db)` used by `/predict` to find matching medicines by the `uses` column.

## ML model

- Training script: `backend/train_uses_model.py` — uses TF-IDF + LinearSVC and saves the pipeline to `backend/models/uses_model.pkl`.
- Prediction: `backend/ml_model.py` loads the joblib model and exposes `predict_disease(symptoms_text)` which returns a `uses_label` string.

If `backend/models/uses_model.pkl` is missing, run the training script:

```bash
# from repository root
python backend/train_uses_model.py
```

## Frontend

- Run the frontend dev server from `frontend/` using Vite:

```bash
cd frontend
npm install
npm run dev
```

The UI calls the backend at `http://localhost:8000` (hardcoded in the client). Adjust the frontend or proxy if your backend is hosted elsewhere.

## Running the backend (development)

1. Create a virtual environment and install dependencies (example):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt  # see suggested list below if file is missing
```

2. Ensure your MySQL database is running and the `medicines` table exists and is populated.
   - The connection is currently configured inside `backend/app.py` (look for `DATABASE_URL`). It's set to use MySQL (pymysql). Update credentials or move them to environment variables as needed.

3. Start the Flask app:

```powershell
python backend/app.py
```

The server runs on port 8000 by default.

## Suggested Python requirements

If `backend/requirements.txt` is not present, here are the packages used by the backend (pin versions as you prefer):

- Flask
- flask-cors
- SQLAlchemy
- pymysql
- pillow
- pytesseract
- joblib
- scikit-learn
- pandas

You can create a `backend/requirements.txt` with the following minimal content:

```
Flask
flask-cors
SQLAlchemy
pymysql
pillow
pytesseract
joblib
scikit-learn
pandas
```

Notes about pytesseract: you need to install the Tesseract OCR binary on your system separately (https://github.com/tesseract-ocr/tesseract). On Windows install and make sure the executable is on PATH or point pytesseract.pytesseract.tesseract_cmd at the installed binary.

## Environment / Credentials

Currently `backend/app.py` contains an inline `DATABASE_URL` using MySQL. Do not commit production secrets. Preferably update `app.py` to read DB credentials from environment variables or place them in `backend/.env` (this repo includes a placeholder `.env` file).

A placeholder backend `.env` is included under `backend/.env`—replace the values before running.

## Notes, limitations and next steps

- This project is educational and not medical advice—both the UI and server include disclaimers.
- The ML model predicts a `uses` label (not a medical diagnosis). Use caution and consult professionals for real medical workflows.
- Consider adding:
  - a `requirements.txt` in `backend/` (if missing)
  - Dockerfiles for reproducible dev environment
  - Proper environment variable handling and secrets management
  - Unit tests for backend endpoints

## Contact / Development

Open an issue or edit files locally — the codebase is small and meant for iterative improvements.

---
Generated by an automated README creation step that scanned project files to summarize structure and usage.
