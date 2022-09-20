export const PORT = process.env.PORT || 8080;
export const CORS_URL = process.env.CORS_URL;
export const DB = {
  PASSWORD: process.env.DB_PASSWORD,
  NAME: process.env.DB_NAME,
  USER: process.env.DB_USERNAME,
};
export const URI = `mongodb+srv://${DB.USER}:${encodeURIComponent(
  DB.PASSWORD!
)}@cluster0.9ste0e0.mongodb.net/?retryWrites=true&w=majority`;
