import express from 'express'
import {login, register} from '../controller/student.controller.js'
import { middleware } from '../middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login',middleware, login);

export default router;