import express, { Router } from "express";
import { registerAuthor, updateAuthor } from "../controllers/author";
import { checkAuth } from "../utils/auth";

const router: Router = express.Router();

router.post('/', registerAuthor)
router.patch('/:id', checkAuth, updateAuthor)
router.patch('/password', checkAuth, updatePassword)

export default router