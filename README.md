# gsheets-twilio-sms
Send SMS from google sheets using app script. With just two functions you can start sending mass text today.

# Twilio
Twilio is a cloud based communications Platform as a Service company. Twillio allows you to register phone numbers for voice, video, and sms. 

# Goolge Sheets 
Google sheets is an online spreadsheet application from Google. It is compatible with Open Office and Microsoft Excel. 

# Setup 
1. Create a google sheet 
2. Name the first sheet tab as "Send Text" (no quotes), this is important so it matches the app script 
3. Add a header row to "Send Text" with three columns [Phone Number,	Message,	Status], the naming doesn't need to be exact but you do need to know what data goes into each. 
4. Add list of phone numbers to the phone number column. Make sure they are in 10 digit format wiht dashes "-". If country code is needed use +CountryCode
5. Add body of the text you want to send each phone number. Whatever row the body text is in it goes to the phone number in that same row. Per row body text is implemented to allow for dynamic content or personalized text. 
6. Configure your app script by adding your ACCOUNT_SID, Twilio Phone Number, and AUTH_TOKEN
7. Save and authorize your app script in google sheets 
8. Run the sendAll() function 
9. Review results 
