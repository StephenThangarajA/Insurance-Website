import express from 'express';
import { getPortfolio, buyStock, sellStock } from '../controllers/portfolioController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getPortfolio);
router.post('/buy', protect, buyStock);
router.post('/sell', protect, sellStock);

export default router;