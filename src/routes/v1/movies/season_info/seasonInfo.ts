import express, { Request, Router } from "express";
import Repo from "./repo";
const router = Router();

router.post("/seasons/:id/season_info", Repo.createSeasonInfo);

router.get("/season_info", Repo.getSeasonInfos);
router.get("/season_info/:id", Repo.getSeasonInfoById);

router.put("/season_info/:id", Repo.updateSeasonInfoById);

router.delete("/season_info/:id", Repo.deleteSeasonInfoById);
export default router;
