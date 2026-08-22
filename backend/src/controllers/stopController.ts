import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getStops = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: tripId } = req.params as any;
    const userId = req.userId;

    const trip = await prisma.trip.findFirst({ where: { id: tripId, userId } });
    if (!trip) return sendError(res, 'Trip not found or unauthorized', 404);

    const stops = await prisma.stop.findMany({
      where: { tripId },
      include: { city: true },
      orderBy: { arrival: 'asc' }, 
    });

    sendSuccess(res, stops);
  } catch (error) {
    next(error);
  }
};

export const createStop = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: tripId } = req.params as any;
    const userId = req.userId;
    const { cityId, arrival, departure } = req.body;

    if (!cityId) return sendError(res, 'cityId is required', 400);

    if (arrival && departure) {
      if (new Date(departure) < new Date(arrival)) {
        return sendError(res, 'departure must not be before arrival', 400);
      }
    }

    const trip = await prisma.trip.findFirst({ where: { id: tripId, userId } });
    if (!trip) return sendError(res, 'Trip not found or unauthorized', 404);

    const city = await prisma.city.findUnique({ where: { id: cityId } });
    if (!city) return sendError(res, 'City not found', 404);

    const stop = await prisma.stop.create({
      data: {
        tripId,
        cityId,
        arrival: arrival ? new Date(arrival) : null,
        departure: departure ? new Date(departure) : null,
      },
    });

    sendSuccess(res, stop, 201);
  } catch (error) {
    next(error);
  }
};

export const updateStop = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: tripId, stopId } = req.params as any;
    const userId = req.userId;
    const { arrival, departure } = req.body;

    const trip = await prisma.trip.findFirst({ where: { id: tripId, userId } });
    if (!trip) return sendError(res, 'Trip not found or unauthorized', 404);

    if (arrival && departure) {
      if (new Date(departure) < new Date(arrival)) {
        return sendError(res, 'departure must not be before arrival', 400);
      }
    }

    const stop = await prisma.stop.update({
      where: { id: stopId, tripId },
      data: {
        ...(arrival !== undefined && { arrival: arrival ? new Date(arrival) : null }),
        ...(departure !== undefined && { departure: departure ? new Date(departure) : null }),
      },
    });

    sendSuccess(res, stop);
  } catch (error) {
    if ((error as any).code === 'P2025') return sendError(res, 'Stop not found', 404);
    next(error);
  }
};

export const deleteStop = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: tripId, stopId } = req.params as any;
    const userId = req.userId;

    const trip = await prisma.trip.findFirst({ where: { id: tripId, userId } });
    if (!trip) return sendError(res, 'Trip not found or unauthorized', 404);

    await prisma.stop.delete({
      where: { id: stopId, tripId },
    });

    sendSuccess(res, null, 204);
  } catch (error) {
    if ((error as any).code === 'P2025') return sendError(res, 'Stop not found', 404);
    next(error);
  }
};
