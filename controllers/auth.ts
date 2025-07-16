import { Router, Request, Response } from 'express';
import { authorizeRole } from '../middlewares/authorizeRole';
import { AuthService } from '../services/authService';

const router = Router();


router.post('/register', authorizeRole(['admin']), async (req: Request, res: Response) => {
    try {
        const user = await AuthService.register(req.body);
        return res.status(201).json({ message: 'Пользователь зарегистрирован', user });
    } catch (error: any) {
        return res.status(400).json({ message: error.message || 'Ошибка регистрации' });
    }
});


router.post('/login', async (req: Request, res: Response) => {
    try {
        console.log(req);
        const token = await AuthService.login(req.body);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });
        return res.json({ message: 'Авторизация успешна' });
    } catch (error: any) {
        return res.status(400).json({ message: error.message || 'Ошибка авторизации' });
    }
});

export default router; 