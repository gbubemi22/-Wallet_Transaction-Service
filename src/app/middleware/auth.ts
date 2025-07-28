import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import jwt, { Secret } from "jsonwebtoken";
import { Controller } from "../utils/constant.js";

export const verifyToken: Controller = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Authorization header is missing or invalid",
      httpStatusCode: 401,
      error: "VALIDATION_ERROR",
      service: process.env.SERVICE_NAME as string,
    });
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: "Invalid token",
          httpStatusCode: 401,
          error: "VALIDATION_ERROR",
          service: process.env.SERVICE_NAME as string,
        });
      }

      // Set the decoded token payload on the request object
      req.user = { id: decoded.id, token };

      // Call the next middleware or route handler
      next();
    }
  );
};

export function verifyJwtToken(token: string): any {
  try {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    return jwt.verify(token, secret as string);
  } catch (error: any) {
    console.error("JWT verification failed:", error.message);

    return {
      success: false,
      message: "Invalid or expired token",
      httpStatusCode: 401,
      error: "VALIDATION_ERROR",
      service: process.env.SERVICE_NAME as string,
    };
  }
}

