# SymptoCare - Frontend & Backend Integration Guide

This document explains how to connect and run the SymptoCare frontend and backend together.

## Project Structure

```
symptocare/
├── backend/          # Flask Python API server
│   ├── app.py        # Main Flask application
│   ├── .env          # Backend environment variables
│   ├── ml_model.py   # Disease prediction model
│   ├── medicine_model.py  # Database model
│   └── services/     # Business logic services
│
└── frontend/         # React + Vite frontend
    ├── .env          # Frontend environment variables
    ├── src/
    │   ├── lib/api.ts     # API client configuration
    │   ├── pages/Symptoms.tsx    # Symptom checker page
    │   └── pages/Medicine.tsx    # Medicine search page
    └── package.json
```

## Architecture Overview

### Backend (Flask)
- **Port**: 8000
- **Framework**: Flask + SQLAlchemy + Flask-CORS
- **Database**: MySQL (medicine_db)
- **Endpoints**:
  - `POST /search-medicine` - Predict disease from symptoms using ML model
  - `POST /api/search-medicine` - Search medicine by name or image OCR

### Frontend (React + Vite)
- **Port**: 8080 (dev server)
- **Framework**: React 18 + TypeScript + TailwindCSS
- **API Client**: [src/lib/api.ts](src/lib/api.ts)
- **Pages**:
  - `/symptoms` - Symptom checker
  - `/medicine` - Medicine search

## Setup Instructions

### 1. Backend Setup

#### Prerequisites
- Python 3.8+
- MySQL Server running
- Tesseract OCR installed (for image medicine extraction)

#### Environment Configuration
Edit [backend/.env](backend/.env) with your database credentials:

```env
DB_USER=root
DB_PASS=your_password
DB_HOST=127.0.0.1
DB_NAME=medicine_db
FLASK_ENV=development
TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
```

#### Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Run Backend Server
```bash
python app.py
```

The backend will start at `http://localhost:8000`

### 2. Frontend Setup

#### Environment Configuration
The frontend is pre-configured in [frontend/.env](frontend/.env):

```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=SymptoCare
```

Change `VITE_API_URL` if your backend runs on a different URL.

#### Install Dependencies
```bash
cd frontend
npm install
# or with bun
bun install
```

#### Run Frontend Dev Server
```bash
npm run dev
```

The frontend will start at `http://localhost:8080`

## Running Both Services

### Option 1: Two Terminal Windows
Open two terminals in your workspace root:

**Terminal 1 - Backend**:
```bash
cd backend
python app.py
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
```

### Option 2: Using VS Code Tasks
Create a `.vscode/tasks.json` in the workspace root (if not exists):

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Backend: Start Flask",
      "type": "shell",
      "command": "python",
      "args": ["app.py"],
      "cwd": "${workspaceFolder}/backend",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^.*$",
          "file": 1,
          "location": 2,
          "message": 3
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Running on",
          "endsPattern": "WARNING"
        }
      }
    },
    {
      "label": "Frontend: Start Vite Dev",
      "type": "shell",
      "command": "npm",
      "args": ["run", "dev"],
      "cwd": "${workspaceFolder}/frontend",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^.*$",
          "file": 1,
          "location": 2,
          "message": 3
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "VITE",
          "endsPattern": "ready in"
        }
      }
    }
  ]
}
```

## API Integration Details

### Frontend API Client
The frontend uses a configured API client in [src/lib/api.ts](src/lib/api.ts):

#### Symptom Prediction
```typescript
import { predictSymptoms } from "@/lib/api";

const response = await predictSymptoms("fever cough headache");
// Returns: { disease: string, medicines: string[], disclaimer: string }
```

Used in: [src/pages/Symptoms.tsx](src/pages/Symptoms.tsx)

#### Medicine Search
```typescript
import { searchMedicineByName, searchMedicineByImage } from "@/lib/api";

// By name
const result = await searchMedicineByName("aspirin");

// By image
const result = await searchMedicineByImage(file);
```

Used in: [src/pages/Medicine.tsx](src/pages/Medicine.tsx)

### CORS Configuration
The backend has CORS enabled in `app.py`:
```python
from flask_cors import CORS
CORS(app)  # Allows requests from all origins in development
```

## Troubleshooting

### Backend not responding
1. Check if Flask is running on port 8000: `netstat -an | findstr 8000`
2. Verify database credentials in `.env`
3. Check database connection: `mysql -u root -p`

### Frontend can't connect to backend
1. Verify backend is running at `http://localhost:8000`
2. Check `VITE_API_URL` in [frontend/.env](frontend/.env)
3. Check browser console for CORS errors
4. Ensure CORS is enabled in backend `app.py`

### Database errors
1. Create the `medicine_db` database if it doesn't exist
2. Import database schema if needed
3. Verify credentials match [backend/.env](backend/.env)

### OCR not working for medicine image search
1. Install Tesseract: https://github.com/UB-Mannheim/tesseract/wiki
2. Update `TESSERACT_CMD` in [backend/.env](backend/.env) with correct installation path

## Development Workflow

1. **Start Backend**: Terminal 1 runs Flask on port 8000
2. **Start Frontend**: Terminal 2 runs Vite dev server on port 8080
3. **Edit Code**: Changes auto-reload in both (hot module replacement in frontend)
4. **Test**: Navigate to `http://localhost:8080` in your browser
5. **Check Console**: Frontend dev tools show API calls and errors

## Building for Production

### Backend
```bash
cd backend
# Set FLASK_ENV=production in .env
python app.py
```

### Frontend
```bash
cd frontend
npm run build
```

This creates an optimized build in `frontend/dist/`

## Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
