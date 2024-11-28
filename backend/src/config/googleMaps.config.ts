import axios from "axios";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const googleMapsBaseURL = "https://maps.googleapis.com/maps/api";

export const getGoogleMapsAPIKey = () => {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("API Key do Google Maps não configurada!");
  }
  return apiKey;
};

export const googleMapsClient = axios.create({
  baseURL: googleMapsBaseURL,
  timeout: 5000, 
});
