@echo off
title SI-Prep Exam Studio & Dual AI Coach
echo ========================================================
echo   SI-PREP EXAM STUDIO - GEMINI + OPENAI COACH
echo ========================================================
echo   Starting local server. Your browser will open automatically.
echo ========================================================
where py >nul 2>nul
if %errorlevel% equ 0 (
    py server.py
    goto end
)

where python >nul 2>nul
if %errorlevel% equ 0 (
    python server.py
    goto end
)

if exist "C:\Python312\python.exe" (
    "C:\Python312\python.exe" server.py
    goto end
)

echo [ERROR] Python not found in PATH or at C:\Python312\python.exe.
:end
pause
