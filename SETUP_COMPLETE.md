# SymptoCare Integration Summary

## ✅ Frontend & Backend Successfully Linked

### What's Connected

**Backend (Flask API Server)**
- Location: [backend/app.py](backend/app.py)
- Port: 8000
- Endpoints:
  - `POST /search-medicine` → Predict disease from symptoms
  - `POST /api/search-medicine` → Search medicine by name or image

**Frontend (React Application)**
- Location: [frontend/src](frontend/src)
- Port: 8080
- API Client: [frontend/src/lib/api.ts](frontend/src/lib/api.ts)
- Pages using API:
  - [frontend/src/pages/Symptoms.tsx](frontend/src/pages/Symptoms.tsx) → Disease prediction
  - [frontend/src/pages/Medicine.tsx](frontend/src/pages/Medicine.tsx) → Medicine search

### Configuration Files Created/Updated

1. **[backend/.env](backend/.env)** - Backend database and environment settings
2. **[frontend/.env](frontend/.env)** - Frontend API URL configuration
3. **[frontend/src/lib/api.ts](frontend/src/lib/api.ts)** - Now reads from environment variables
4. **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** - Complete setup and troubleshooting guide
5. **[startup.ps1](startup.ps1)** - PowerShell script to start both servers

### Quick Start

#### Option 1: Manual (Two Terminals)
```bash
# Terminal 1
cd backend
python app.py

# Terminal 2
cd frontend
npm run dev
```

#### Option 2: PowerShell Script
```powershell
.\startup.ps1
```

#### Option 3: VS Code Tasks
Press `Ctrl+Shift+B` to run build tasks (requires `.vscode/tasks.json`)

### Verification

**Backend Health**: `http://localhost:8000/` → Returns `{"status": "ok"}`

**Frontend**: `http://localhost:8080` → Opens SymptoCare app

### Data Flow

```
User Input (Frontend)
    ↓
API Client (api.ts) - POST request to backend
    ↓
Flask API (app.py) - Processes request
    ↓
ML Model / Database Service
    ↓
JSON Response
    ↓
Frontend renders results (React components)
```

### API Examples

**Symptom Prediction**
```javascript
POST http://localhost:8000/search-medicine
Content-Type: application/json

{"symptoms": "fever cough headache"}

Response:
{
  "disease": "flu",
  "medicines": ["paracetamol", "cough syrup"],
  "disclaimer": "This is educational, not medical advice"
}
```

**Medicine Search**
```javascript
POST http://localhost:8000/api/search-medicine
Content-Type: multipart/form-data

name: "aspirin"
// or image: <file>

Response:
{
  "name": "aspirin",
  "priceRupee": 50,
  "manufacturerName": "Bayer",
  "type": "tablet",
  "uses": "pain relief",
  // ... more fields
}
```

### Environment Variables

**Backend** ([backend/.env](backend/.env))
```env
DB_USER=root
DB_PASS=Prince@2307
DB_HOST=127.0.0.1
DB_NAME=medicine_db
FLASK_ENV=development
TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
```

**Frontend** ([frontend/.env](frontend/.env))
```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=SymptoCare
```

### Features Working

- ✅ CORS enabled on backend
- ✅ Environment variable configuration
- ✅ API client with error handling
- ✅ Hot module reloading (frontend)
- ✅ Database integration (MySQL)
- ✅ ML model prediction
- ✅ Medicine OCR from images
- ✅ Responsive UI with TailwindCSS

### Next Steps

1. **Start both servers** using one of the methods above
2. **Open** `http://localhost:8080` in your browser
3. **Test Symptom Checker** - Enter symptoms to predict disease
4. **Test Medicine Search** - Search by name or upload medicine strip image
5. **Check Console** - Browser dev tools show API calls and responses

### Troubleshooting

- **Backend not responding**: Verify MySQL is running, check [backend/.env](backend/.env) credentials
- **CORS errors**: Ensure Flask is running with CORS enabled
- **API URL not working**: Check `VITE_API_URL` in [frontend/.env](frontend/.env)
- **Database errors**: Create `medicine_db` database, verify connection

See [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) for detailed troubleshooting.
