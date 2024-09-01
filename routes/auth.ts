import express, { Router } from "express";
import { getToken } from "../controllers/auth";

const router: Router = express.Router();

router.post('/', getToken)

export default router