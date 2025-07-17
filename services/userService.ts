import { User } from '../persistent/models/user';

export class UserService {
    static async getUserById(id: number) {
        const user = await User.findByPk(id);
        if (!user) throw new Error('Пользователь не найден');
        return user;
    }

    static async getAllUsers() {
        return User.findAll();
    }

    static async blockUser(id: number) {
        const user = await User.findByPk(id);
        if (!user) throw new Error('Пользователь не найден');
        user.status = false;
        await user.save();
        return user;
    }
} 