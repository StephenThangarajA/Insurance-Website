import express from 'express';
import { getStocks, getStockBySymbol, seedStocks } from '../controllers/stockController.js';

const router = express.Router();

router.get('/', getStocks);
router.get('/:symbol', getStockBySymbol);
router.post('/seed', seedStocks);

export default router;