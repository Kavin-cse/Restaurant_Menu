@echo off
cd /d "c:\Users\kavin\Downloads\L&T pro-2\L&T pro-2\movie-ticket-booking"
echo Starting server... > "c:\Users\kavin\Documents\Projects\RestaurantProject\server_log.txt"
npm run dev >> "c:\Users\kavin\Documents\Projects\RestaurantProject\server_log.txt" 2>&1
