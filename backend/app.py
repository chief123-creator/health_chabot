# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from pathlib import Path

from ml_model import predict_disease

app = Flask(__name__)
CORS(app)

# Load medicine database
MED_DB_PATH = Path(__file__).with_name("medicine_db.json")
with open(MED_DB_PATH, "r", encoding="utf-8") as f:
    MEDICINE_DB = json.load(f)


@app.route("/predict", methods=["POST"])
def predict():
    """
    Expected JSON body: { "symptoms": "fever cough headache" }
    """
    data = request.get_json(force=True)
    symptoms_text = data.get("symptoms", "")

    if not symptoms_text.strip():
        return jsonify({"error": "symptoms field is required"}), 400

    disease = predict_disease(symptoms_text)
    med_info = MEDICINE_DB.get(disease)

    response = {
        "disease": disease,
        "medicine": med_info,
        "disclaimer": "This is an educational tool, not medical advice. Always consult a qualified doctor."
    }
    return jsonify(response)


@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    # change port if 5000 blocked: app.run(port=8000)
    app.run(host="0.0.0.0", port=8000, debug=True)
