import express from 'express';
import travelRoutes from './routes/travelRoutes';

const app = express();

app.use(express.json());
app.use('/api/travels', travelRoutes);

export default app;
