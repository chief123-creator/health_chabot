#!/usr/bin/env pwsh
# SymptoCare startup script for Windows PowerShell
# Starts both backend and frontend development servers

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "SymptoCare - Full Stack Startup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if running from correct directory
if (-not (Test-Path "backend") -or -not (Test-Path "frontend")) {
    Write-Host "Error: Please run this script from the SymptoCare workspace root directory" -ForegroundColor Red
    exit 1
}

Write-Host "Starting Backend (Flask on port 8000)..." -ForegroundColor Yellow
Write-Host "Starting Frontend (Vite on port 8080)..." -ForegroundColor Yellow
Write-Host ""

# Start backend in a new PowerShell window
Write-Host "Opening backend terminal..." -ForegroundColor Green
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\backend'; python app.py"

# Wait a moment for backend to start
Start-Sleep -Seconds 2

# Start frontend in a new PowerShell window
Write-Host "Opening frontend terminal..." -ForegroundColor Green
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\frontend'; npm run dev"

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "Both servers are starting!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend URL:  http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend URL: http://localhost:8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tip: Open http://localhost:8080 in your browser once both servers are ready" -ForegroundColor Yellow
