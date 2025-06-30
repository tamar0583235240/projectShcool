import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Student } from '../models/models_student';
import { Teacher } from '../models/models_teacher';
import { generateToken } from '../middleware/middleware_auth';
import { body, validationResult } from 'express-validator';

const router = Router();

// Student login
router.post('/student/login', [
  body('id').notEmpty().withMessage('Student ID is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, password } = req.body;
    
    const student = await Student.findOne({ id });
    if (!student) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, student.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ id: student.id, type: 'student' });
    
    res.json({
      token,
      user: {
        id: student.id,
        name: student.name,
        grade: student.grade,
        type: 'student'
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error });
  }
});

// Teacher login
router.post('/teacher/login', [
  body('id').isInt().withMessage('Teacher ID must be a number'),
  body('password').notEmpty().withMessage('Password is required')
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, password } = req.body;
    
    const teacher = await Teacher.findOne({ id: parseInt(id) });
    if (!teacher) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, teacher.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ id: teacher.id, type: 'teacher' });
    
    res.json({
      token,
      user: {
        id: teacher.id,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        class: teacher.class,
        type: 'teacher'
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error });
  }
});

export default router;