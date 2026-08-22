import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      search,
      cityId,
      category,
      cost,
      maxCost,
      minCost,
      duration,
      page,
      limit,
    } = req.query;

    // Validation
    let parsedCost: number | undefined;
    if (cost !== undefined) {
      parsedCost = Number(cost);
      if (isNaN(parsedCost) || parsedCost < 0) {
        return sendError(res, 'Cost must be a non-negative number', 400);
      }
    }

    let parsedMaxCost: number | undefined;
    if (maxCost !== undefined) {
      parsedMaxCost = Number(maxCost);
      if (isNaN(parsedMaxCost) || parsedMaxCost < 0) {
        return sendError(res, 'maxCost must be a non-negative number', 400);
      }
    }

    let parsedMinCost: number | undefined;
    if (minCost !== undefined) {
      parsedMinCost = Number(minCost);
      if (isNaN(parsedMinCost) || parsedMinCost < 0) {
        return sendError(res, 'minCost must be a non-negative number', 400);
      }
    }

    if (duration !== undefined) {
      const parsedDuration = Number(duration);
      if (isNaN(parsedDuration) || parsedDuration < 0) {
        return sendError(res, 'Duration must be a non-negative number', 400);
      }
    }

    let take: number | undefined;
    let skip: number | undefined;

    if (page !== undefined) {
      const parsedPage = Number(page);
      if (!Number.isInteger(parsedPage) || parsedPage < 1) {
        return sendError(res, 'Page must be a positive integer', 400);
      }
      const pageLimit = limit !== undefined ? Number(limit) : 20;
      if (!Number.isInteger(pageLimit) || pageLimit < 1) {
        return sendError(res, 'Limit must be a positive integer', 400);
      }
      take = pageLimit;
      skip = (parsedPage - 1) * pageLimit;
    } else if (limit !== undefined) {
      const parsedLimit = Number(limit);
      if (!Number.isInteger(parsedLimit) || parsedLimit < 1) {
        return sendError(res, 'Limit must be a positive integer', 400);
      }
      take = parsedLimit;
    }

    const andConditions: any[] = [];

    if (cityId && typeof cityId === 'string' && cityId.trim() !== '') {
      andConditions.push({ cityId: cityId.trim() });
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      const term = search.trim();
      andConditions.push({
        OR: [
          { name: { contains: term, mode: 'insensitive' } },
          { description: { contains: term, mode: 'insensitive' } },
        ],
      });
    }

    if (category && typeof category === 'string' && category.trim() !== '') {
      const cat = category.trim();
      andConditions.push({
        OR: [
          { description: { contains: cat, mode: 'insensitive' } },
          { name: { contains: cat, mode: 'insensitive' } },
        ],
      });
    }

    const costFilter: any = {};
    if (parsedCost !== undefined) {
      costFilter.lte = parsedCost;
    }
    if (parsedMinCost !== undefined) {
      costFilter.gte = parsedMinCost;
    }
    if (parsedMaxCost !== undefined) {
      costFilter.lte = parsedMaxCost;
    }
    if (Object.keys(costFilter).length > 0) {
      andConditions.push({ cost: costFilter });
    }

    const whereClause = andConditions.length > 0 ? { AND: andConditions } : {};

    const activities = await prisma.activity.findMany({
      where: whereClause,
      include: {
        city: true,
      },
      orderBy: {
        name: 'asc',
      },
      ...(take !== undefined && { take }),
      ...(skip !== undefined && { skip }),
    });

    return sendSuccess(res, activities);
  } catch (error) {
    next(error);
  }
};

export const getActivityById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string' || id.trim() === '') {
      return sendError(res, 'Activity ID is required', 400);
    }

    const activity = await prisma.activity.findUnique({
      where: { id },
      include: {
        city: true,
      },
    });

    if (!activity) {
      return sendError(res, 'Activity not found', 404);
    }

    return sendSuccess(res, activity);
  } catch (error) {
    next(error);
  }
};
