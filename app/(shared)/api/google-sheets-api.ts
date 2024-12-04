import { google } from 'googleapis';

export interface IGoogleSheetsData {
  majorDimension: string;
  range: string;
  values: string[][];
}

export const GoogleSheetsApi = {
  credentials: {
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    project_id: process.env.GOOGLE_PROJECT_ID,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE,
    universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
  },

  getData: async (): Promise<IGoogleSheetsData> => {
    const auth = new google.auth.GoogleAuth({
      credentials: GoogleSheetsApi.credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ auth, version: 'v4' });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = process.env.GOOGLE_SHEET_RANGE;

    const response = await sheets.spreadsheets.values.get({
      range,
      spreadsheetId,
    });

    return response.data;
  },
};
