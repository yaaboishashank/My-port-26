import { Router } from 'express';
import { health } from '../controllers/health.controller.js';
import { portfolioIndex, projectIndex, projectShow } from '../controllers/portfolio.controller.js';

const router = Router();
router.get('/health', health);
router.get('/v1/portfolio', portfolioIndex);
router.get('/v1/projects', projectIndex);
router.get('/v1/projects/:slug', projectShow);
export default router;
