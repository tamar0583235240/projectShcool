import { Router } from 'express';
import { TeacherController } from '../controllers/controllers_teacher';
import { validateTeacher, validateId } from '../middleware/middleware_validation';
import { authenticateToken } from '../middleware/middleware_auth';

const router = Router();

// Public routes (no authentication required for demo)
router.get('/', TeacherController.getAll);
router.get('/:id', validateId, TeacherController.getById);
router.get('/class/:class', TeacherController.getByClass);
router.post('/', validateTeacher, TeacherController.create);
router.put('/:id', validateId, validateTeacher, TeacherController.update);
router.delete('/:id', validateId, TeacherController.delete);

export default router;