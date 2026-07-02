import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: "marharytaaniska@gmail.com",
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({
  version: "v3",
  auth,
});