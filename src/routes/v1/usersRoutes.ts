import { Router } from "express";
import { 
  listData,
  detailData,
  createData,
  updateData,
  deleteData
} from "../../controllers/users/index";
import authMiddleware from "../../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, listData);
router.get("/:id", authMiddleware, detailData);
router.post("/", authMiddleware, createData);
router.put("/:id", authMiddleware, updateData);
router.delete("/:id", authMiddleware, deleteData);

export default router;