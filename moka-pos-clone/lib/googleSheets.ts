import { google } from 'googleapis';

export async function getSheets() {
  const target = ['https://www.googleapis.com/auth/spreadsheets'];
  const jwt = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    undefined,
    (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    target
  );
  
  const sheets = google.sheets({ version: 'v4', auth: jwt });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  
  return { sheets, spreadsheetId };
}
