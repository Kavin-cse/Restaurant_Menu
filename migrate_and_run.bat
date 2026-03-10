@echo off
set "SOURCE_DIR=c:\Users\kavin\Downloads\L&T pro-2\L&T pro-2\movie-ticket-booking"
set "DEST_DIR=c:\Users\kavin\Documents\Projects\RestaurantAppClean"

echo Creating clean project directory at: %DEST_DIR%
if not exist "%DEST_DIR%" mkdir "%DEST_DIR%"

echo Copying project files (excluding node_modules)...
xcopy "%SOURCE_DIR%" "%DEST_DIR%" /E /I /H /Y /exclude:%SOURCE_DIR%\.gitignore
REM Note: xcopy exclude is tricky, let's just copy everything and delete node_modules if needed, or better, use robocopy if available, but xcopy is safer for simple batch.
REM Actually, we can just copy and then delete node_modules if it was copied.
REM But copying node_modules is slow. Let's try to skip it.
REM Creating an exclude file
echo node_modules\ > exclude.txt
echo .git\ >> exclude.txt
xcopy "%SOURCE_DIR%" "%DEST_DIR%" /E /I /H /Y /exclude:exclude.txt
del exclude.txt

cd /d "%DEST_DIR%"

echo Installing dependencies in clean path...
call npm install

echo Starting server...
call npm run dev

pause
