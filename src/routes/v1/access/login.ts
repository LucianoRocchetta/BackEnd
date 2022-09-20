import express, { Request, Router } from "express";
import validator from "../../../shared/validator";
import schema from "./schema";
import Repo from "./repo";

const router = Router();

router.post("/login", validator(schema.loginCredentials), Repo.login);

export default router;
