import { Router } from 'express';
import { StudentController } from '../controllers/controllers_student';
import { validateStudent, validateId } from '../middleware/middleware_validation';
import { authenticateToken } from '../middleware/middleware_auth';

const router = Router();

// Public routes (no authentication required for demo)
router.get('/', StudentController.getAll);
router.get('/:id', validateId, StudentController.getById);
router.get('/grade/:grade', StudentController.getByGrade);
router.post('/', validateStudent, StudentController.create);
router.put('/:id', validateId, validateStudent, StudentController.update);
router.delete('/:id', validateId, StudentController.delete);

export default router;