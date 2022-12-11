import express, { Request, Router } from "express";
import Repo from "./repo";
const router = Router();

router.post("/movies", Repo.createMovies);

router.get("/movies", Repo.getMovies);
router.get("/movies/:id", Repo.getMovieById);

router.put("/movies/:id", Repo.updateMovieById);

router.delete("/movies/:id", Repo.deleteMovieById);
export default router;
