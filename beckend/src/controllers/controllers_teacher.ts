import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Teacher } from '../models/models_teacher';
import bcrypt from 'bcryptjs';

export class TeacherController {
  // Get all teachers
  static async getAll(req: Request, res: Response) {
    try {
      const teachers = await Teacher.find({}, { password: 0 });
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Get teacher by ID
  static async getById(req: Request, res: Response) {
    try {
      const teacher = await Teacher.findOne({ id: parseInt(req.params.id) }, { password: 0 });
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
      res.json(teacher);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Create new teacher
  static async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if teacher already exists
      const existingTeacher = await Teacher.findOne({ 
        $or: [{ id: req.body.id }, { tz: req.body.tz }]
      });
      
      if (existingTeacher) {
        return res.status(400).json({ error: 'Teacher with this ID or TZ already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const teacher = new Teacher({
        ...req.body,
        password: hashedPassword
      });

      await teacher.save();
      
      // Return teacher without password
      const { password, ...teacherData } = teacher.toObject();
      res.status(201).json(teacherData);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Update teacher
  static async update(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const updateData = { ...req.body };
      
      // Hash password if provided
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      const teacher = await Teacher.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        updateData,
        { new: true, select: '-password' }
      );

      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }

      res.json(teacher);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Delete teacher
  static async delete(req: Request, res: Response) {
    try {
      const teacher = await Teacher.findOneAndDelete({ id: parseInt(req.params.id) });
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
      res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Get teacher by class
  static async getByClass(req: Request, res: Response) {
    try {
      const teacher = await Teacher.findOne({ class: req.params.class }, { password: 0 });
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found for this class' });
      }
      res.json(teacher);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }
}