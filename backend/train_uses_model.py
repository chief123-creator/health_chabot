import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.svm import LinearSVC
from sklearn.metrics import classification_report, accuracy_score
import joblib

BASE_DIR = os.path.dirname(__file__)
DATA_PATH = os.path.join(BASE_DIR, "data", "Symptoms.csv")
MODEL_DIR = os.path.join(BASE_DIR, "models")
MODEL_PATH = os.path.join(MODEL_DIR, "uses_model.pkl")

os.makedirs(MODEL_DIR, exist_ok=True)

def load_data():
    try:
        # Pehle 'latin1' encoding try karo, ye Excel files ke liye best hai
        df = pd.read_csv(DATA_PATH, usecols=[0, 1], encoding='latin1')
    except UnicodeDecodeError:
        # Agar wo na chale toh 'cp1252' try karo
        df = pd.read_csv(DATA_PATH, usecols=[0, 1], encoding='cp1252')
    
    # Baki cleanup code waisa hi rahega
    df.columns = ["symptoms_text", "uses_label"]
    df = df[df["symptoms_text"] != "symptoms_text"].dropna()
    df["symptoms_text"] = df["symptoms_text"].astype(str)
    df["uses_label"] = df["uses_label"].astype(str)
    return df

def train():
    df = load_data()
    X = df["symptoms_text"]
    y = df["uses_label"]

    # stratify hata diya hai kyunki 107 labels mein se kuch ki single entry ho sakti hai
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    pipeline = Pipeline([
        ("tfidf", TfidfVectorizer(
            ngram_range=(1, 2), # "Chest pain" jaise do words ke patterns ko pakadne ke liye
            min_df=1,           # Kyunki data bhot bada nahi hai, min_df=1 rakho
            max_df=0.95,
            lowercase=True,
        )),
        ("clf", LinearSVC(C=1.0))
    ])

    pipeline.fit(X_train, y_train)
    # ... baki code same rahega

    y_pred = pipeline.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {acc:.3f}")
    print(classification_report(y_test, y_pred))

    joblib.dump(pipeline, MODEL_PATH)
    print(f"Model saved to: {MODEL_PATH}")

if __name__ == "__main__":
    train()
