export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const DEFAULT_ADMIN = {
    lastName: 'Admin',
    firstName: 'Admin',
    parentName: null,
    birthDate: '1970-01-01',
    email: 'admin@admin.com',
    password: 'admin',
    role: 'admin',
};

export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
export const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USER = process.env.DB_USER || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';
export const DB_NAME = process.env.DB_NAME || 'test_task_node';
export const DB_DIALECT = 'postgres'; 