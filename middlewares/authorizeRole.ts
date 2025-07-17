import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../persistent/models/user';
import { JWT_SECRET } from '../config';

export function authorizeRole(roles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: 'Нет токена авторизации' });
        }
        try {
            const payload = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
            // Проверка блокировки пользователя
            const user = await User.findByPk(payload.id);
            if (!user || user.status === false) {
                return res.status(403).json({ message: 'Пользователь заблокирован' });
            }
            if (!roles.includes(payload.role)) {
                return res.status(403).json({ message: 'Нет доступа' });
            }
            (req as any).userId = payload.id;
            (req as any).userRole = payload.role;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Неверный токен' });
        }
    };
} 