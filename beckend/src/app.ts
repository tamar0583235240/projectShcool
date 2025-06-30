import express, { Application } from 'express';
import cors from 'cors';

import studentRoutes from './routes/routes_students';
import teacherRoutes from './routes/routes_teachers';
import gradeRoutes from './routes/routes_grades';
import authRoutes from './routes/routes_auth';
import connectDB from './config/database_connection';



const app: Application = express();

connectDB()
  .then(() => console.log('✅ Database connected successfully'))
  .catch((error) => console.error('❌ Database connection failed:', error));

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/grades', gradeRoutes);

export default app