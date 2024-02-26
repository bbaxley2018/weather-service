// src/index.js
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes";
import { CORS_OPTIONS } from "./constants";
import express from "express";

/**
 * Main Entry Point for the program.
 */
const app = express();
dotenv.config();

const corsOptions: cors.CorsOptions = CORS_OPTIONS


app.use(cors(corsOptions));
app.use('/',router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});



