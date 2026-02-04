# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from urllib.parse import quote_plus
from PIL import Image
import pytesseract
import io
from ml_model import predict_disease


   # NOTE: jahan pe tera model hai
from medicine_model import MedicineModel, Base  # NEW: model alag file mein
from services.medicine_service import search_by_uses  # NEW: service layer

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": False
    }
})

# --------- (OPTIONAL) JSON TEST DB (ab use nahi kar rahe) ----------
MED_DB_PATH = Path(__file__).with_name("medicine_db.json")
with open(MED_DB_PATH, "r", encoding="utf-8") as f:
    MEDICINE_DB = json.load(f)
# -------------------------------------------------------------------

@app.route("/search-medicine", methods=["POST", "OPTIONS"])
def predict():
    """
    Expected JSON body: { "symptoms": "fever cough headache" }
    Returns disease + medicines info from MySQL + disclaimer.
    """
    if request.method == "OPTIONS":
        return "", 200
    
    try:
        data = request.get_json(force=True)
        symptoms_text = data.get("symptoms", "")

        if not symptoms_text.strip():
            return jsonify({"error": "symptoms field is required"}), 400

        # 1) predict disease using your ML model
        disease = predict_disease(symptoms_text)

        db = SessionLocal()
        try:
            # 2) use your new logic: search by `uses` column
            medicines = search_by_uses(disease, db)

            return jsonify({
                "disease": disease,
                "medicines": medicines,   # array of medicines
                "disclaimer": "This is an educational tool, not medical advice. Always consult a qualified doctor."
            }), 200

        except Exception as e:
            return jsonify({"error": f"Server error: {str(e)}"}), 500

        finally:
            db.close()
    
    except Exception as e:
        return jsonify({"error": f"Request error: {str(e)}"}), 400


@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"}), 200


# Database Configuration
DB_USER = "root"
DB_PASS = quote_plus("Prince@2307")
DB_HOST = "127.0.0.1"
DB_NAME = "medicine_db"

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}/{DB_NAME}?charset=utf8mb4"

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


@app.route("/api/search-medicine", methods=["POST", "OPTIONS"])
def search_medicine():
    """
    Accepts:
      - form-data: name=<medicine name>
      - or form-data: image=<file> (medicine strip)
    """
    db = SessionLocal()

    try:
        name = request.form.get("name", "").strip()

        # if no text name, try image-based OCR
        if not name and "image" in request.files:
            extracted = ocr_extract_name(request.files["image"])
            if not extracted:
                return jsonify({"error": "Could not read medicine name from image"}), 400
            name = extracted

        if not name:
            return jsonify({"error": "Medicine name is required"}), 400

        # case-insensitive search for first matching medicine
        query = (
            db.query(MedicineModel)
            .filter(MedicineModel.name.ilike(f"%{name}%"))
            .first()
        )

        if not query:
            return jsonify({"error": "Medicine not found in database"}), 404

        substitutes = [
            s for s in [
                query.substitute0,
                query.substitute1,
                query.substitute2,
                query.substitute3,
                query.substitute4,
            ] if s
        ]

        result = {
            "name": query.name,
            "priceRupee": float(query.price_rupee) if query.price_rupee is not None else None,
            "manufacturerName": query.manufacturer_name,
            "type": query.type,
            "packSize": query.pack_size_label,
            "substitutes": substitutes,
            "sideEffects": query.Consolidated_Side_Effects,
            "chemicalClass": query.Chemical_Class,
            "therapeuticClass": query.Therapeutic_Class,
            "imageUrl": query.image_url,
            "composition": query.composition,
            "uses": query.uses,
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

    finally:
        db.close()


def ocr_extract_name(file_storage) -> str | None:
    """Read uploaded image and try to extract a medicine name."""
    img_bytes = file_storage.read()
    try:
        img = Image.open(io.BytesIO(img_bytes))
    except Exception:
        return None

    text = pytesseract.image_to_string(img)
    cleaned = "".join(ch if ch.isalnum() or ch.isspace() else " " for ch in text)
    tokens = cleaned.split()
    return tokens[0] if tokens else None


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)


#only for test 
@app.route("/__debug/routes")
def debug_routes():
    return {
        "routes": [str(rule) for rule in app.url_map.iter_rules()]
    }

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
