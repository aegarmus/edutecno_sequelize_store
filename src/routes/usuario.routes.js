import { Router } from "express";
import { createUser, getAllActiveUsers, getAllUsers, getUsersByFilters } from "../controllers/usuario.controller.js";


const router = Router()

router.post('/usuario', createUser);
router.get('/admin/usuario', getAllUsers);
router.get('/usuario', getAllActiveUsers);
router.get('/usuario/filter', getUsersByFilters);


export default router;