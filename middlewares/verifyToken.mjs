import jwt from "jsonwebtoken";
import Users from "../models/user.mjs";
import jwtSecret from "../config/jwt.mjs";

async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    console.log("🔑 Auth Header:", authHeader);

    if (!authHeader) {
      return res.status(401).send({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Malformed token" });
    }

    // Decode token
    const decoded = jwt.verify(token, jwtSecret);
    console.log("✅ Decoded token:", decoded);

    // Check if token exists in user doc
    const tokenExists = await Users.findOne({ tokens: token });
    if (!tokenExists) {
      return res.status(401).send({ message: "Invalid token!" });
    }

    req.userId = decoded._id;
    req.tokenToRemove = token;
    next();
  } catch (e) {
    console.error("❌ Token verification error:", e.message);
    return res.status(401).send({ message: "Invalid token!" });
  }
}

export default verifyToken;
