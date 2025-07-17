import 'dotenv/config';
import express, { Request, Response } from 'express';
import connection from './persistent/connection';
import cookieParser from 'cookie-parser';
import authRouter from './controllers/auth';
import userRouter from './controllers/user';
import { AuthService } from './services/authService';
import { PORT } from './config';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/users', userRouter);

const start = async (): Promise<void> => {
    try {
        await connection.sync({ alter: true });
        const created = await AuthService.createDefaultAdmin();
        if (created) {
            console.log('Default admin created: admin@admin.com');
        }
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();