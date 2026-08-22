import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendError, sendSuccess } from './utils/response';
import { errorHandler } from './middleware/errorHandler';
import apiRoutes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api', apiRoutes);

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  sendError(res, 'Route not found', 404);
});

// Global Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
