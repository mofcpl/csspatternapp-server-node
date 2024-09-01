import express, { Router } from "express";
import { getProject, getProjects } from "../controllers/project";

const router: Router = express.Router();

router.get('/', getProjects)
router.get('/:id', getProject)
router.post('/')
router.patch('/:id')

export default router