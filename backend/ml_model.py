import os
import joblib
from typing import Any

BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "models", "uses_model.pkl")

_model: Any = None

def _load_model():
    global _model
    if _model is not None:
        return
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(
            f"ML model file not found at {MODEL_PATH}. "
            "Train it first with train_uses_model.py."
        )
    _model = joblib.load(MODEL_PATH)

def predict_disease(symptoms_text: str) -> str:
    """
    Returns a uses_label like 'Treatment of Bacterial infections'
    based on user symptoms text.
    """
    _load_model()

    text = (symptoms_text or "").strip()
    if not text:
        return "Unknown"

    pred = _model.predict([text])[0]
    return str(pred)
