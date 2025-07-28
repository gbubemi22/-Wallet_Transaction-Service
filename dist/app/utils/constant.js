import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { v4 as uuidV4 } from "uuid";
export const generateTransactionRef = (prefix = "TRX") => {
    // Generate UUID and remove hyphens
    const uuid = uuidV4().replace(/-/g, "");
    // Take first 12 characters of UUID and combine with prefix
    const reference = `${prefix}_${uuid.substring(0, 12).toUpperCase()}`;
    return reference;
};
export const generateRandomString = (length = 9) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
export const generateJWT = async (id, email) => {
    const expiresIn = process.env.JWT_TOKEN_VALIDITY;
    const token = jwt.sign({
        id: id,
        email: email,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresIn });
    return token;
};
export function parseJSON(value) {
    try {
        return JSON.parse(value);
    }
    catch (err) {
        return value;
    }
}
