/**
 * sendSms(to, body)
 *   Sends the text "body" parameter to the "to" parameter.  
 *   to: which phone number you are sending SMS to must be in format 123-456-7890 (10 digit with "-", if international add +Country_Code-)
 *   body: the body of text you want to send as a normal string (not http formatting required)  
 **/
function sendSms(to, body) {
  
  // Where you need to send requests to 
  var messages_url = "https://api.twilio.com/2010-04-01/Accounts/ACCOUNT_SID/Messages.json"; // needs your account SID 

  // Forming Request Payload
  var payload = {
    "To": to,
    "Body" : body,
    "From" : "+YOUR_NUMBER" // Your twilio number 
  };

  // Request Options 
  var options = {
    "method" : "post",
    "payload" : payload
  };

  // Authorization to make the request 
  options.headers = { 
    "Authorization" : "Basic " + Utilities.base64Encode("ACCOUNT_SID:AUTH_TOKEN") // Needs your Account SID and Auth Token
  };

  // Make request 
  UrlFetchApp.fetch(messages_url, options);
}

/**
 * sendAll() 
 *   Loops through all phones entries in a list and sends them the text body in the corresponding column
 **/
function sendAll() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Send Text"); // Get the sheet with the text targets and sms bodies 
  var startRow = 2; // Ignore the header row 
  var numRows = sheet.getLastRow() - 1; // Ignore the header row 
  var dataRange = sheet.getRange(startRow, 1, numRows, 2) // Get range of all target rows and column of body text
  var data = dataRange.getValues(); // Get the values in the range and converting to them an object 

  // Loop through data to actually send SMS 
  for (i in data) {
    var row = data[i]; // what row are we on 
    try {
      // Logger.log(row[0]);
      // Logger.log(row[1]);
      response_data = sendSms(row[0], row[1]); // Did twilio API work? 
      status = "sent"; // log that sms was went 
    } catch(err) {  
      Logger.log(err); // log any errors 
      status = err; // log error if one comes up
    }
    sheet.getRange(startRow + Number(i), 3).setValue(status); // Log result of the API, if success it logs "sent" if not it logs "err"
  }
}
