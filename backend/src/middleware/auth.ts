import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { sendError } from '../utils/response';
import { prisma } from '../config/prisma';

declare global {
  namespace Express {
    interface Request {
      user?: any;
      userId?: string;
    }
  }
}

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(supabaseUrl, supabaseKey);

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return sendError(res, 'Missing authorization token', 401);
    }

    if (!authHeader.startsWith('Bearer ')) {
      return sendError(res, 'Invalid authorization format', 401);
    }

    const token = authHeader.substring(7);
    if (!token) {
      return sendError(res, 'Invalid authorization format', 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return sendError(res, 'Invalid or expired token', 401);
    }

    let dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email || '',
          name: user.user_metadata?.name || user.user_metadata?.full_name || 'User'
        }
      });
    }

    req.userId = dbUser.id;
    req.user = dbUser;
    
    next();
  } catch (error) {
    next(error);
  }
};
