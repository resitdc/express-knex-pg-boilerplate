import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routesV1 from "./src/routes/index";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1", routesV1);

app.listen(port, () => {
  console.log(`\x1b[94mServer started on\x1b[0m \x1b[92mhttp://localhost:${port}\x1b[0m`);
});
