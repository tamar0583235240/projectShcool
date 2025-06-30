import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Grade } from '../models/models_grade';
import { Student } from '../models/models_student';

export class GradeController {
  // Get all grades
  static async getAll(req: Request, res: Response) {
    try {
      const grades = await Grade.find({});
      res.json(grades);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Get grades by student ID
  static async getByStudentId(req: Request, res: Response) {
    try {
      const grades = await Grade.find({ studentId: req.params.studentId });
      if (grades.length === 0) {
        return res.status(404).json({ error: 'No grades found for this student' });
      }
      res.json(grades);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Get grades by subject
  static async getBySubject(req: Request, res: Response) {
    try {
      const grades = await Grade.find({ subject: req.params.subject });
      res.json(grades);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Create new grade
  static async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Verify student exists
      const studentExists = await Student.findOne({ id: req.body.studentId });
      if (!studentExists) {
        return res.status(400).json({ error: 'Student not found' });
      }

      // Check if grade already exists for this student and subject
      const existingGrade = await Grade.findOne({
        studentId: req.body.studentId,
        subject: req.body.subject
      });

      if (existingGrade) {
        return res.status(400).json({ error: 'Grade already exists for this student and subject' });
      }

      const grade = new Grade(req.body);
      await grade.save();
      res.status(201).json(grade);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Update grade
  static async update(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const grade = await Grade.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!grade) {
        return res.status(404).json({ error: 'Grade not found' });
      }

      res.json(grade);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Delete grade
  static async delete(req: Request, res: Response) {
    try {
      const grade = await Grade.findByIdAndDelete(req.params.id);
      if (!grade) {
        return res.status(404).json({ error: 'Grade not found' });
      }
      res.json({ message: 'Grade deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Get student report card (all grades for a student with average)
  static async getStudentReport(req: Request, res: Response) {
    try {
      const grades = await Grade.find({ studentId: req.params.studentId });
      
      if (grades.length === 0) {
        return res.status(404).json({ error: 'No grades found for this student' });
      }

      const totalScore = grades.reduce((sum, grade) => sum + grade.score, 0);
      const average = Math.round((totalScore / grades.length) * 100) / 100;

      const report = {
        studentId: req.params.studentId,
        grades: grades,
        average: average,
        totalSubjects: grades.length
      };

      res.json(report);
    } catch (error) {
      console.error('Error fetching student report:', error);
      res.status(500).json({ error: 'Server error', details: error });
    }
  }

  // Get class statistics for a subject
  static async getSubjectStatistics(req: Request, res: Response) {
    try {
      const grades = await Grade.find({ subject: req.params.subject });
      
      if (grades.length === 0) {
        return res.status(404).json({ error: 'No grades found for this subject' });
      }

      const scores = grades.map(g => g.score);
      const average = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) / 100;
      const highest = Math.max(...scores);
      const lowest = Math.min(...scores);

      const statistics = {
        subject: req.params.subject,
        totalStudents: grades.length,
        average: average,
        highest: highest,
        lowest: lowest,
        grades: grades
      };

      res.json(statistics);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error });
    }
  }
}