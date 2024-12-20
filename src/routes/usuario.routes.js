import { Router } from "express";
import { createUser, deletUser, getActiveUserById, getAllActiveUsers, getAllUsersIncludeDeleted, getUserByIdIncludeDeleted, getUsersByFilters, physicDeletUser, restoreUser, updateUser } from "../controllers/usuario.controller.js";


const router = Router()

router.post('/', createUser);
router.get('/', getAllActiveUsers);
router.get('/filter', getUsersByFilters);
router.get('/:id', getActiveUserById);
router.put('/:id', updateUser)
router.delete('/:id', deletUser);
router.patch('/:id', restoreUser)

router.get('/admin/', getAllUsersIncludeDeleted);
router.get('/admin/:id', getUserByIdIncludeDeleted)
router.delete('/admin/:id', physicDeletUser)

export default router;