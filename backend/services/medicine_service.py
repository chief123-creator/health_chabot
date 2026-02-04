# services/medicine_service.py
from sqlalchemy.orm import Session
from medicine_model import MedicineModel   # same folder level as app.py

def search_by_uses(disease: str, db: Session):
    """
    Find top 3 medicines by matching disease text in 'uses' column.
    Returns list[dict].
    """
    medicines = (
        db.query(MedicineModel)
        .filter(MedicineModel.uses.ilike(f"%{disease}%"))
        .order_by(MedicineModel.price_rupee.asc())
        .limit(3)
        .all()
    )

    return format_medicines_list(medicines)

def format_medicines_list(medicines):
    result = []

    for med in medicines:
        substitutes = [
            s for s in [
                med.substitute0, med.substitute1, med.substitute2,
                med.substitute3, med.substitute4
            ] if s
        ]

        result.append({
            "name": med.name,
            "priceRupee": float(med.price_rupee) if med.price_rupee is not None else None,
            "manufacturerName": med.manufacturer_name,
            "type": med.type,
            "packSize": med.pack_size_label,
            "substitutes": substitutes,
            "sideEffects": med.Consolidated_Side_Effects,
            "chemicalClass": med.Chemical_Class,
            "therapeuticClass": med.Therapeutic_Class,
            "imageUrl": med.image_url,
            "composition": med.composition,
            "uses": med.uses,
        })

    return result
