import * as dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import express, { Application, Request, Response, NextFunction } from "express";
const app: Application = express();

import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import { errorHandlerMiddleware } from "./app/middleware/error-handler.js";
import { handleNotFound } from "./app/middleware/not-found.js";
import route from "./app/router/index.js";

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
  app.use(compression());
}

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${req.method} >> ${req.get("HOST")}${req.originalUrl}`);
    if (["POST", "PUT", "PATCH"].includes(req.method))
      console.log("========Request body==========\n", req.body);
    if (
      ["GET", "DELETE"].includes(req.method) &&
      Object.keys(req.params).length > 0
    )
      console.log("========Request params==========\n", req.params);

    if (req.method === "GET" && Object.keys(req.query).length > 0)
      console.log("========Request query string==========\n", req.query);
    console.log("====Auth token====\n", req.headers);

    next();
  });
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to BrickPine Service api...",
    httpStatusCode: StatusCodes.OK,
    service: process.env.SERVICE_NAME as string,
  });
});

// USE ROUTES
app.use(route);

// Error handling middleware

app.use(handleNotFound);
app.use(errorHandlerMiddleware);

//port
const PORT = process.env.PORT;

app.listen(PORT, async () => {
  try {
    console.log(`⚡️ Server running on port ${PORT}`);
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
});
