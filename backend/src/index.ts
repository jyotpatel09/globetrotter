import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/health', async (req: Request, res: Response) => {
  try {
    // Optionally test the database connection
    // await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
