import dotenv from "dotenv";

dotenv.config({ path: new URL("../.env", import.meta.url) });

export const PORT = process.env.PORT || 5000;
export const MONGODB_URL = process.env.MONGODB_URL;
export const SECRET_KEY = process.env.SECRET_KEY;
export const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;