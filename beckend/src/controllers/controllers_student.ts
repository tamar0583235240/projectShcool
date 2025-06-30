import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Student } from '../models/models_student';
import bcrypt from 'bcryptjs';

export class StudentController {
  // Get all students
  static async getAll(req: Request, res: Response) {
    try {
      const students = await Student.find({}, { password: 0 });
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Get student by ID
  static async getById(req: Request, res: Response) {
    try {
      const student = await Student.findOne({ id: req.params.id }, { password: 0 });
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Create new student
  static async create(req: Request, res: Response) {
    try {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors: errors.array() });
      // }

      // Check if student already exists
      const existingStudent = await Student.findOne({ id: req.body.id });
      if (existingStudent) {
        return res.status(400).json({ error: 'Student with this ID already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const student = new Student({
        ...req.body,
        password: hashedPassword
      });

      await student.save();
      
      // Return student without password
      const { password, ...studentData } = student.toObject();
      res.status(201).json(studentData);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Update student
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

      const student = await Student.findOneAndUpdate(
        { id: req.params.id },
        updateData,
        { new: true, select: '-password' }
      );

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      res.json(student);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Delete student
  static async delete(req: Request, res: Response) {
    try {
      const student = await Student.findOneAndDelete({ id: req.params.id });
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json({ message: 'Student deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Get students by grade
  static async getByGrade(req: Request, res: Response) {
    try {
      const students = await Student.find({ grade: req.params.grade }, { password: 0 });
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }
}