import jwt from "jsonwebtoken";

const { sign } = jwt;
import "dotenv/config";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

class TokenService {
  generateToken(payload: string | object) {
    const accessToken = sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }
}

//
export default TokenService;
