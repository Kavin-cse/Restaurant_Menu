@echo off
cd /d "c:\Users\kavin\Documents\Projects\RestaurantAppClean"

if exist ".angular\cache" (
    echo Clearing Angular cache...
    rmdir /s /q ".angular\cache"
)

echo Starting Restaurant App (Clean Build)...
call npm run dev
pause
