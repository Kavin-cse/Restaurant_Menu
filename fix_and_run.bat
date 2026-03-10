@echo off
cd /d "c:\Users\kavin\Documents\Projects\RestaurantAppClean"
echo Installing missing Angular build tools...
call npm install --save-dev @angular-devkit/build-angular@^17.0.0
echo Starting server...
call npm run dev
pause
