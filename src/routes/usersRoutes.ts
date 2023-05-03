import { Router } from "express";
import { list } from "../controllers/users/index";

const router = Router();

router.get("/", list);

export default router;