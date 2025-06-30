import { body, param } from 'express-validator';

// Student validation
export const validateStudent = [
  body('id').notEmpty().withMessage('Student ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('age').isInt({ min: 5, max: 18 }).withMessage('Age must be between 5 and 18'),
  body('phone').matches(/^05[0-9]-[0-9]{7}$/).withMessage('Phone must be in format 05X-XXXXXXX'),
  body('grade').notEmpty().withMessage('Grade is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.street').notEmpty().withMessage('Street is required'),
  body('address.building').notEmpty().withMessage('Building is required'),
  body('address.apartment').notEmpty().withMessage('Apartment is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Teacher validation
export const validateTeacher = [
  body('id').isInt().withMessage('Teacher ID must be a number'),
  body('tz').isLength({ min: 9, max: 9 }).withMessage('ID number must be 9 digits'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('class').notEmpty().withMessage('Class is required'),
  body('phone').matches(/^05[0-9]-[0-9]{7}$/).withMessage('Phone must be in format 05X-XXXXXXX'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.street').notEmpty().withMessage('Street is required'),
  body('address.building').notEmpty().withMessage('Building is required'),
  body('address.apartment').notEmpty().withMessage('Apartment is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Grade validation
export const validateGrade = [
  body('studentId').notEmpty().withMessage('Student ID is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('score').isInt({ min: 0, max: 100 }).withMessage('Score must be between 0 and 100')
];

// Parameter validation
export const validateId = [
  param('id').notEmpty().withMessage('ID parameter is required')
];