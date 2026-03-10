@echo off
setlocal EnableDelayedExpansion

REM Get the short path of the directory to avoid issues with "&" and spaces
for %%I in ("c:\Users\kavin\Downloads\L&T pro-2\L&T pro-2\movie-ticket-booking") do set "PROJECT_DIR=%%~sI"

echo Navigating to project directory: !PROJECT_DIR!
cd /d "!PROJECT_DIR!"

echo Installing dependencies...
call npm install --no-audit

echo Starting server...
call npm run dev

pause
