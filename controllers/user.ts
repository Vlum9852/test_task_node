import { Router, Request, Response } from 'express';
import { authorizeRole } from '../middlewares/authorizeRole';
import { allowSelfOrAdmin } from '../middlewares/allowSelfOrAdmin';
import { UserService } from '../services/userService';

const router = Router();

// Получение пользователя по ID (admin или сам пользователь)
router.get('/:id', authorizeRole(['admin', 'user']), allowSelfOrAdmin, async (req: Request, res: Response) => {
    try {
        const user = await UserService.getUserById(Number(req.params.id));
        res.json(user);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

// Получение списка пользователей (только admin)
router.get('/', authorizeRole(['admin']), async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Блокировка пользователя (admin или сам пользователь)
router.patch('/:id/block', authorizeRole(['admin', 'user']), allowSelfOrAdmin, async (req: Request, res: Response) => {
    try {
        const user = await UserService.blockUser(Number(req.params.id));
        res.json({ message: 'Пользователь заблокирован', user });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

export default router; 