@echo off
setlocal
set "BASE=c:\Users\kavin\Downloads\L"
set "REST=&T pro-2\L"
set "PROJ=&T pro-2\movie-ticket-booking"
set "PROJDIR=%BASE%%REST%%PROJ%"
set "NGCLI=%PROJDIR%\node_modules\@angular\cli\bin\ng.js"

pushd "%PROJDIR%"
if errorlevel 1 (
  echo ERROR: Could not navigate to project directory.
  pause
  exit /b 1
)

echo ============================================================
echo   CineBook - Movie Ticket Booking System
echo   Starting Angular Dev Server...
echo   Open browser: http://localhost:4200
echo ============================================================
echo.

node "%NGCLI%" serve --open

popd
