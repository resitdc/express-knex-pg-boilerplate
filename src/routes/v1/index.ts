import { Router } from "express";
import usersRoutes from "./usersRoutes";
import authRoutes from "./authRoutes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);

export default router;
