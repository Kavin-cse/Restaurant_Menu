@echo off
cd /d "c:\Users\kavin\Documents\Projects\RestaurantAppClean"

echo Performing NUCLEAR RESET of node_modules...
if exist "node_modules" (
    echo Deleting node_modules...
    rmdir /s /q "node_modules"
)
if exist "package-lock.json" (
    echo Deleting package-lock.json...
    del "package-lock.json"
)

echo Installing dependencies (this may take 5-10 minutes)...
call npm install

echo Starting server...
call npm run dev

pause
