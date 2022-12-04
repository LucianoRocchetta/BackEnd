import express, { Request, Router } from "express";
import Repo from "./repo";
const router = Router();

router.post("/seasons", Repo.createSeason);

router.get("/seasons", Repo.getSeasons);
router.get("/seasons/:id", Repo.getSeasonById);

router.put("/seasons/:id", Repo.updateSeasonById);

export default router;
