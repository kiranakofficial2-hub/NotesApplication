import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import notesRouter from "./routes/notesRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/api/notes", notesRouter);

// Start server
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});