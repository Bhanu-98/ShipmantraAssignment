import { config } from 'dotenv';
config({path: './.env'});
export const API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;