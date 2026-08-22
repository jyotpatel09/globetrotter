import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getTrips = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.query as any;
    
    if (!userId || typeof userId !== 'string') {
      return sendError(res, 'userId is required (temporary until auth is integrated)', 400);
    }

    const trips = await prisma.trip.findMany({
      where: { userId },
      include: { stops: true },
    });

    sendSuccess(res, trips);
  } catch (error) {
    next(error);
  }
};

export const createTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, name, startDate, endDate } = req.body;

    if (!userId || !name || typeof name !== 'string' || name.trim() === '') {
      return sendError(res, 'userId and a non-empty name are required', 400);
    }

    if (startDate && endDate) {
      if (new Date(endDate) < new Date(startDate)) {
        return sendError(res, 'endDate must not be before startDate', 400);
      }
    }

    const trip = await prisma.trip.create({
      data: {
        userId,
        name: name.trim(),
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    sendSuccess(res, trip, 201);
  } catch (error) {
    next(error);
  }
};

export const getTripById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as any;

    const trip = await prisma.trip.findUnique({
      where: { id },
      include: { stops: { include: { city: true } } },
    });

    if (!trip) {
      return sendError(res, 'Trip not found', 404);
    }

    sendSuccess(res, trip);
  } catch (error) {
    next(error);
  }
};

export const updateTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as any;
    const { name, startDate, endDate } = req.body;

    if (startDate && endDate) {
      if (new Date(endDate) < new Date(startDate)) {
        return sendError(res, 'endDate must not be before startDate', 400);
      }
    }

    const trip = await prisma.trip.update({
      where: { id },
      data: {
        ...(name && { name: name.trim() }),
        ...(startDate !== undefined && { startDate: startDate ? new Date(startDate) : null }),
        ...(endDate !== undefined && { endDate: endDate ? new Date(endDate) : null }),
      },
    });

    sendSuccess(res, trip);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return sendError(res, 'Trip not found', 404);
    }
    next(error);
  }
};

export const deleteTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as any;

    await prisma.trip.delete({
      where: { id },
    });

    sendSuccess(res, null, 204);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return sendError(res, 'Trip not found', 404);
    }
    next(error);
  }
};
