@echo off

REM Navigate to the root folder
cd /d %~dp0

REM Run the Python script in a new Command Prompt window
echo Starting Python server in a new window...
start cmd /k "python scripts\image_scraper.py"

REM Wait for the Python server to start
echo Waiting for Python server to start...

:waitLoop
ping -n 2 localhost >nul
curl -s http://localhost:5000 >nul
IF %ERRORLEVEL% NEQ 0 (
    echo Python server not ready, waiting...
    timeout /t 2 /nobreak >nul
    goto waitLoop
)

REM Run npm command to start the development server in the root folder
echo Starting npm development server...
npm run dev

REM Pause to keep the window open after the script runs
pause
