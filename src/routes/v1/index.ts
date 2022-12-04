import { Router } from "express";

import login from "./access/login/login";
import movie from "./movies/movie/movie";
import season from "./movies/season/season";
import genre from "./movies/genre/genre";
import specification from "./movies/specification/specification";
const router = Router();

router.use("/access/", login);

router.use("/", movie);
router.use("/movies", season);
router.use("/movies", genre);
router.use("/movies", specification);

export default router;
