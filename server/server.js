import './config/instrument.js';
import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node"; // Keep only one import for Sentry
import { clerkWebhooks } from './controllers/webhooks.js';

// Initialize express
const app = express();

// Connect to the database
await connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('API Working'));

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

app.post('/webhooks', clerkWebhooks);

// Sentry error handling
Sentry.setupExpressErrorHandler(app);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
