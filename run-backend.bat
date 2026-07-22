@echo off
echo.
echo ===================================================
echo Starting NLUBOTTRAINER Python Backend Services
echo ===================================================
echo.

cd "%~dp0drizzle\python-backend"

if not exist venv (
    echo Creating Python Virtual Environment venv...
    python -m venv venv
    if errorlevel 1 (
        echo Failed to create virtual environment. Please make sure Python is installed and in your system PATH.
        pause
        exit /b 1
    )
)

echo Activating Virtual Environment...
call venv\Scripts\activate

echo Installing/Verifying ML Service Dependencies - unpinned for Python 3.14 compatibility...
venv\Scripts\python -m pip install -r requirements-ml.txt
if errorlevel 1 (
    echo.
    echo Failed to install dependencies.
    echo.
    pause
    exit /b 1
)

echo Starting ML Service on port 8000...
venv\Scripts\python ml_service.py

echo.
pause
