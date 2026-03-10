@echo off
cd /d "c:\Users\kavin\Downloads\L&T pro-2\L&T pro-2\movie-ticket-booking"
echo Starting server via direct node invocation... > "c:\Users\kavin\Documents\Projects\RestaurantProject\server_log.txt"
node "node_modules\@angular\cli\bin\ng.js" serve >> "c:\Users\kavin\Documents\Projects\RestaurantProject\server_log.txt" 2>&1
