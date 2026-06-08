import { Router } from "express";

import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getUsers);

router.post("/", createUser);

router.get("/:id", authMiddleware, getUserById);

router.put("/:id", authMiddleware, updateUser);

router.delete("/:id", authMiddleware, deleteUser);

export default router;