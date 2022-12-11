import express, { Request, Router } from "express";
import Repo from "./repo";
const router = Router();

router.post("/movies/:id/seasons", Repo.createSeason);

router.get("/seasons", Repo.getSeasons);
router.get("/seasons/:id", Repo.getSeasonById);

router.put("/seasons/:id", Repo.updateSeasonById);
router.put("/seasons/:id/season_info", Repo.updateSeasonToOtherChanges);

router.delete("/seasons/:id", Repo.deleteSeasonById);

export default router;
