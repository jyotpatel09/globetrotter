import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, country, page, limit } = req.query;

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

    const whereClause: any = {};

    if (search && typeof search === 'string' && search.trim() !== '') {
      const term = search.trim();
      whereClause.OR = [
        { name: { contains: term, mode: 'insensitive' } },
        { country: { contains: term, mode: 'insensitive' } },
      ];
    }

    if (country && typeof country === 'string' && country.trim() !== '') {
      whereClause.country = { contains: country.trim(), mode: 'insensitive' };
    }

    const cities = await prisma.city.findMany({
      where: whereClause,
      include: {
        _count: {
          select: { activities: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
      ...(take !== undefined && { take }),
      ...(skip !== undefined && { skip }),
    });

    return sendSuccess(res, cities);
  } catch (error) {
    next(error);
  }
};

export const getCityById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string' || id.trim() === '') {
      return sendError(res, 'City ID is required', 400);
    }

    const city = await prisma.city.findUnique({
      where: { id },
      include: {
        activities: true,
      },
    });

    if (!city) {
      return sendError(res, 'City not found', 404);
    }

    return sendSuccess(res, city);
  } catch (error) {
    next(error);
  }
};
