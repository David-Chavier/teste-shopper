import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const googleMapsBaseURL = "https://maps.googleapis.com/maps/api";

export const getGoogleMapsAPIKey = () => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("API Key do Google Maps não configurada!");
  }
  return apiKey;
};

export const googleMapsClient = axios.create({
  baseURL: googleMapsBaseURL,
  timeout: 5000, 
});
