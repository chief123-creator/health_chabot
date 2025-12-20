# ml_model.py

def predict_disease(symptoms_text: str) -> str:
    """
    Very simple rule-based predictor for now.
    Later you will replace this with a trained ML model.
    """
    text = symptoms_text.lower()

    if any(x in text for x in ["fever", "body pain", "chills"]) and "cough" in text:
        return "Flu"
    if any(x in text for x in ["runny nose", "sneeze", "sneezing", "blocked nose", "cold"]):
        return "Common Cold"
    if any(x in text for x in ["one sided headache", "migraine", "throbbing", "light sensitivity"]):
        return "Migraine"
    if any(x in text for x in ["acidity", "burning", "stomach pain", "gastric", "gastritis"]):
        return "Gastritis"

    return "Common Cold"
