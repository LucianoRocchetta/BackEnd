import express, { Request, Router } from "express";
import Repo from "./repo";
const router = Router();

router.post("/movies", Repo.createMovies);

router.get("/movies", Repo.getMovies);

router.put("/movies/:id", Repo.updateMovieById);

export default router;
