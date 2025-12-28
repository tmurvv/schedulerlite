import { Router } from "express";

import { login, save, signup, userExists } from "../controllers/auth";

const router = Router();

router.post("/api/v1/login", login);
router.post("/api/v1/user-exists", userExists);
router.put("/api/v1/signup/:id", signup);
router.put("/api/v1/reset-password", save);

export const authRouter = router;
