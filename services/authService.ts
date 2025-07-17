import { User } from '../persistent/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, DEFAULT_ADMIN } from '../config';

export class AuthService {
    static async register({ lastName, firstName, parentName, birthDate, email, password, role }: {
        lastName: string;
        firstName: string;
        parentName?: string | null;
        birthDate: string;
        email: string;
        password: string;
        role?: string;
    }) {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Пользователь с таким email уже существует');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            lastName,
            firstName,
            parentName,
            birthDate,
            email,
            password: hashedPassword,
            role: role === 'admin' ? 'admin' : 'user',
        });
        return { id: user.id, email: user.email, role: user.role };
    }

    static async login({ email, password }: { email: string; password: string }) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Неверный email или пароль');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Неверный email или пароль');
        }
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        return token;
    }

    static async createDefaultAdmin() {
        const admin = await User.findOne({ where: { email: DEFAULT_ADMIN.email } });
        if (!admin) {
            const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, 10);
            await User.create({ ...DEFAULT_ADMIN, password: hashedPassword });
            return true;
        }
        return false;
    }
} 