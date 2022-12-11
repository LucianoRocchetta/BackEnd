import express, { Request, Router } from "express";
import Repo from "./repo";
const router = Router();

router.post("/genres", Repo.createGenre);

router.get("/genres", Repo.getGenres);
router.get("/genres/:id", Repo.getGenreById);

router.put("/genres/:id", Repo.updateGenre);

router.delete("/genres/:id", Repo.deleteGenre);

export default router;
