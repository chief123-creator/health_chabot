# medicine_model.py
from sqlalchemy import Column, Integer, String, Text, DECIMAL
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class MedicineModel(Base):
    __tablename__ = "medicines"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    price_rupee = Column("price", DECIMAL(10, 2))
    manufacturer_name = Column(String(255))
    type = Column(String(100))
    pack_size_label = Column(String(100))
    substitute0 = Column(String(255))
    substitute1 = Column(String(255))
    substitute2 = Column(String(255))
    substitute3 = Column(String(255))
    substitute4 = Column(String(255))
    Consolidated_Side_Effects = Column(Text)
    Chemical_Class = Column("Chemical Class", String(255))
    Therapeutic_Class = Column("Therapeutic Class", String(255))
    image_url = Column(Text)
    composition = Column(Text)
    uses = Column(Text)
