import express, { Request, Response } from 'express';
import connection from './persistent/connection';
import cookieParser from 'cookie-parser';
import authRouter from './controllers/auth';
import { AuthService } from './services/authService';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);

const start = async (): Promise<void> => {
    try {
        await connection.sync({ alter: true });

        const created = await AuthService.createDefaultAdmin();
        if (created) {
            console.log('Default admin created: admin@admin.com');
        }
        app.listen(3000, () => {
            console.log("Server started on port 3000");
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();