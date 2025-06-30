import { Router } from 'express';
import { GradeController } from '../controllers/controllers_grade';
import { validateGrade, validateId } from '../middleware/middleware_validation';
import { authenticateToken } from '../middleware/middleware_auth';

const router = Router();

// Public routes (no authentication required for demo)
router.get('/', GradeController.getAll);
router.get('/student/:studentId', GradeController.getByStudentId);
router.get('/subject/:subject', GradeController.getBySubject);
router.get('/report/:studentId', GradeController.getStudentReport);
router.get('/statistics/:subject', GradeController.getSubjectStatistics);
router.post('/', validateGrade, GradeController.create);
router.put('/:id', validateId, validateGrade, GradeController.update);
router.delete('/:id', validateId, GradeController.delete);

export default router;