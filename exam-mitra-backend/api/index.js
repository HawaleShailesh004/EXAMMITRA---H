import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import dropdownRoutes from "../routes/dropdownRoute.js";
import extractRoutes from "../routes/extractRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Vercel will prefix with /api, so add it here
app.use("/api", extractRoutes);
app.use("/api", dropdownRoutes);

app.get("/api", (req, res) => {
  res.send("🚀 ExamMitra Backend Deployed via Vercel!");
});

export const handler = serverless(app);
