import express, { Request, Router } from "express";
import Repo from "./repo";
const router = Router();

router.post("/specifications", Repo.createSpecification);

router.get("/specifications", Repo.getSpecifications);
router.get("/specifications/:id", Repo.getSpecificationById);

router.put("/specifications/:id", Repo.updateSpecificationById);
export default router;
