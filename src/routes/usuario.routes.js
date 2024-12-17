import { Router } from "express";
import { createUser, getActiveUserById, getAllActiveUsers, getAllUsers, getUserById, getUsersByFilters } from "../controllers/usuario.controller.js";


const router = Router()

router.post('/usuario', createUser);
router.get('/usuario', getAllActiveUsers);
router.get('/usuario/filter', getUsersByFilters);
router.get('/usuario/:id', getActiveUserById);

router.get('/admin/usuario', getAllUsers);
router.get('/admin/usuario/:id', getUserById);

export default router;