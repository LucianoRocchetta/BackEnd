import express, { Request, Router } from "express";
import Repo from "./repo";
const router = Router();

router.post("/season_info/:id/chapter", Repo.createChapter);

router.get("/season_info/chapters", Repo.getChapters);
router.get("/season_info/chapters/:id", Repo.getChapterById);

router.put("/season_info/chapters/:id", Repo.updateChapterById);

router.delete("/season_info/chapters/:id", Repo.deleteChapterById);

export default router;
