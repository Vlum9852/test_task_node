import { Request, Response, NextFunction } from 'express';

export function allowSelfOrAdmin(req: Request, res: Response, next: NextFunction) {
    const userId = (req as any).userId;
    const userRole = (req as any).userRole;
    const paramId = Number(req.params.id);
    if (userRole === 'admin' || userId === paramId) {
        return next();
    }
    return res.status(403).json({ message: 'Нет доступа' });
} 