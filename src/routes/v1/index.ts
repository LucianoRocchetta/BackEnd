import { Router } from "express";

import login from "./access/login/login";
import movie from "./movies/movie/movie";
import season from "./movies/season/season";
import genre from "./movies/genre/genre";
import specification from "./movies/specification/specification";
import seasonInfo from "./movies/season_info/seasonInfo";
import chapter from "./movies/chapter/chapter";
const router = Router();

router.use("/access/", login);

router.use("/", movie);
router.use("/", season);
router.use("/", seasonInfo);
router.use("/seasons", chapter);
router.use("/", genre);
router.use("/", specification);

export default router;
