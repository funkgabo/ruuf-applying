import { config } from "dotenv";
config(); // Cargar variables de entorno antes de cualquier otra cosa

import express, { Request, Response } from "express";
import next from "next";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import calculations from "./api/calculations";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const dbUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@litswm.b362gwa.mongodb.net/?retryWrites=true&w=majority&appName=LITSWM`; // Reemplaza con tu URI de MongoDB

mongoose.connect(dbUri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  // API routes
  server.use("/api/calculations", calculations);

  // Default catch-all handler to allow Next.js to handle all other routes
  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(3000, (err?: Error) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
