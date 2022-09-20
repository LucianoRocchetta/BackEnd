import { Router } from "express";

import login from "./access/login";

const router = Router();

router.use("/access", login);

export default router;
