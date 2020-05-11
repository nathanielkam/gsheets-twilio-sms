function sendSms(to, body) {
  var messages_url = "https://api.twilio.com/2010-04-01/Accounts/ACCOUNT_ID/Messages.json";

  var payload = {
    "To": to,
    "Body" : body,
    "From" : "+YOUR_PHONE_NUMBER"
  };

  var options = {
    "method" : "post",
    "payload" : payload
  };

  options.headers = { 
    "Authorization" : "Basic " + Utilities.base64Encode("AUTHORIZATION_ID")
  };

  UrlFetchApp.fetch(messages_url, options);
}

function sendAll() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Send Text");
  var startRow = 2; 
  var numRows = sheet.getLastRow() - 1; 
  var dataRange = sheet.getRange(startRow, 1, numRows, 2) 
  var data = dataRange.getValues();

  for (i in data) {
    var row = data[i];
    try {
      // Logger.log(row[0]);
      // Logger.log(row[1]);
      response_data = sendSms(row[0], row[1]);
      status = "sent";
    } catch(err) {
      Logger.log(err);
      status = err;
    }
    sheet.getRange(startRow + Number(i), 3).setValue(status);
  }
}
