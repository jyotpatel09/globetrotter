import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getTrips = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return sendError(res, 'Unauthorized', 401);
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
    const userId = req.userId;
    if (!userId) return sendError(res, 'Unauthorized', 401);

    const { name, startDate, endDate } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return sendError(res, 'A non-empty name is required', 400);
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
    const userId = req.userId;
    if (!userId) return sendError(res, 'Unauthorized', 401);

    const trip = await prisma.trip.findFirst({
      where: { id, userId },
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
    const userId = req.userId;
    if (!userId) return sendError(res, 'Unauthorized', 401);

    const { name, startDate, endDate } = req.body;

    if (startDate && endDate) {
      if (new Date(endDate) < new Date(startDate)) {
        return sendError(res, 'endDate must not be before startDate', 400);
      }
    }

    // Check ownership
    const existing = await prisma.trip.findFirst({ where: { id, userId } });
    if (!existing) return sendError(res, 'Trip not found', 404);

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
    next(error);
  }
};

export const deleteTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as any;
    const userId = req.userId;
    if (!userId) return sendError(res, 'Unauthorized', 401);

    // Check ownership
    const existing = await prisma.trip.findFirst({ where: { id, userId } });
    if (!existing) return sendError(res, 'Trip not found', 404);

    await prisma.trip.delete({
      where: { id },
    });

    sendSuccess(res, null, 204);
  } catch (error) {
    next(error);
  }
};

export const getTripItinerary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as any;
    const userId = req.userId;
    if (!userId) return sendError(res, 'Unauthorized', 401);

    const trip = await prisma.trip.findFirst({
      where: { id, userId },
      include: {
        stops: {
          orderBy: { arrival: 'asc' },
          include: {
            city: true,
            activities: {
              orderBy: { scheduledAt: 'asc' },
              include: { activity: true },
            },
          },
        },
      },
    });

    if (!trip) return sendError(res, 'Trip not found', 404);

    sendSuccess(res, trip);
  } catch (error) {
    next(error);
  }
};

export const getTripBudget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as any;
    const userId = req.userId;
    if (!userId) return sendError(res, 'Unauthorized', 401);

    const trip = await prisma.trip.findFirst({
      where: { id, userId },
      include: {
        stops: {
          include: {
            city: true,
            activities: { include: { activity: true } },
          },
        },
      },
    });

    if (!trip) return sendError(res, 'Trip not found', 404);

    let total = 0;
    const breakdown = trip.stops.map(stop => {
      let stopCost = 0;
      stop.activities.forEach(ta => { stopCost += (ta.activity.cost || 0); });
      total += stopCost;
      return { stopId: stop.id, city: stop.city.name, activitiesCost: stopCost };
    });

    sendSuccess(res, { total, breakdown });
  } catch (error) {
    next(error);
  }
};

export const getTripTimeline = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as any;
    const userId = req.userId;
    if (!userId) return sendError(res, 'Unauthorized', 401);

    const trip = await prisma.trip.findFirst({
      where: { id, userId },
      include: {
        stops: {
          include: {
            city: true,
            activities: { include: { activity: true } },
          },
        },
      },
    });

    if (!trip) return sendError(res, 'Trip not found', 404);

    const events: any[] = [];
    if (trip.startDate) events.push({ type: 'trip_start', date: trip.startDate, title: 'Start of ' + trip.name });
    if (trip.endDate) events.push({ type: 'trip_end', date: trip.endDate, title: 'End of ' + trip.name });

    trip.stops.forEach(stop => {
      if (stop.arrival) events.push({ type: 'stop_arrival', date: stop.arrival, title: 'Arrive in ' + stop.city.name });
      if (stop.departure) events.push({ type: 'stop_departure', date: stop.departure, title: 'Depart from ' + stop.city.name });
      stop.activities.forEach(ta => {
        if (ta.scheduledAt) events.push({ type: 'activity', date: ta.scheduledAt, title: ta.activity.name, city: stop.city.name });
      });
    });

    events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    sendSuccess(res, { trip: { id: trip.id, name: trip.name }, events });
  } catch (error) {
    next(error);
  }
};
