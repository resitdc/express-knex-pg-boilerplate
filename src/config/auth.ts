import dotenv from "dotenv";

dotenv.config();

const authSecret: string = process.env.JWTSECRET || "SECRETSAMPLE";

export default authSecret;
