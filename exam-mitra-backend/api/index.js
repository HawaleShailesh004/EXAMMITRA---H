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

app.use("/", extractRoutes);
app.use("/", dropdownRoutes);

app.get("/", (req, res) => {
  res.send("🚀 ExamMitra Backend Deployed via Vercel!");
});

export const handler = serverless(app); // Required for Vercel
