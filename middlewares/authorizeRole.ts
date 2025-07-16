import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export function authorizeRole(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: 'Нет токена авторизации' });
        }
        try {
            const payload = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
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