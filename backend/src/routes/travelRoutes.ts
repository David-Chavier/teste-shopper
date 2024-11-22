import express from 'express';
import { calculateDistance, getTravels, confirmTravel } from '../controllers/travelController';

const router = express.Router();

router.post('/calculate-distance', calculateDistance);
router.get('/', getTravels);
router.post('/confirm', confirmTravel);

export default router;
