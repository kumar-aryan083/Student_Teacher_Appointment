import express from 'express'
import {login, register} from '../controller/student.controller.js'

const router = express.Router();
router.use(express.json());

router.post('/register', register);
router.get('/login', login);

export default router;