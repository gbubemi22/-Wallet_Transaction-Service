import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Authorization header is missing or invalid",
            httpStatusCode: 401,
            error: "VALIDATION_ERROR",
            service: process.env.SERVICE_NAME,
        });
    }
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Invalid token",
                httpStatusCode: 401,
                error: "VALIDATION_ERROR",
                service: process.env.SERVICE_NAME,
            });
        }
        // Set the decoded token payload on the request object
        req.user = { id: decoded.id, token };
        // Call the next middleware or route handler
        next();
    });
};
export function verifyJwtToken(token) {
    try {
        const secret = process.env.ACCESS_TOKEN_SECRET;
        return jwt.verify(token, secret);
    }
    catch (error) {
        console.error("JWT verification failed:", error.message);
        return {
            success: false,
            message: "Invalid or expired token",
            httpStatusCode: 401,
            error: "VALIDATION_ERROR",
            service: process.env.SERVICE_NAME,
        };
    }
}
