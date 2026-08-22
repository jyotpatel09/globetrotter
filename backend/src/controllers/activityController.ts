import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getTripActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: tripId, stopId } = req.params as any;
    const userId = req.userId;

    const trip = await prisma.trip.findFirst({ where: { id: tripId, userId } });
    if (!trip) return sendError(res, 'Trip not found or unauthorized', 404);

    const activities = await prisma.tripActivity.findMany({
      where: { stopId },
      include: { activity: true },
      orderBy: { scheduledAt: 'asc' },
    });

    sendSuccess(res, activities);
  } catch (error) {
    next(error);
  }
};

export const createTripActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: tripId, stopId } = req.params as any;
    const userId = req.userId;
    const { activityId, scheduledAt } = req.body;

    if (!activityId) return sendError(res, 'activityId is required', 400);

    const trip = await prisma.trip.findFirst({ where: { id: tripId, userId } });
    if (!trip) return sendError(res, 'Trip not found or unauthorized', 404);

    const stop = await prisma.stop.findUnique({ where: { id: stopId, tripId } });
    if (!stop) return sendError(res, 'Stop not found', 404);

    const activity = await prisma.activity.findUnique({ where: { id: activityId } });
    if (!activity) return sendError(res, 'Activity not found', 404);

    const tripActivity = await prisma.tripActivity.create({
      data: {
        stopId,
        activityId,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      },
    });

    sendSuccess(res, tripActivity, 201);
  } catch (error) {
    next(error);
  }
};

export const updateTripActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: tripId, stopId, tripActivityId } = req.params as any;
    const userId = req.userId;
    const { scheduledAt } = req.body;

    const trip = await prisma.trip.findFirst({ where: { id: tripId, userId } });
    if (!trip) return sendError(res, 'Trip not found or unauthorized', 404);

    const tripActivity = await prisma.tripActivity.update({
      where: { id: tripActivityId, stopId },
      data: {
        ...(scheduledAt !== undefined && { scheduledAt: scheduledAt ? new Date(scheduledAt) : null }),
      },
    });

    sendSuccess(res, tripActivity);
  } catch (error) {
    if ((error as any).code === 'P2025') return sendError(res, 'TripActivity not found', 404);
    next(error);
  }
};

export const deleteTripActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: tripId, stopId, tripActivityId } = req.params as any;
    const userId = req.userId;

    const trip = await prisma.trip.findFirst({ where: { id: tripId, userId } });
    if (!trip) return sendError(res, 'Trip not found or unauthorized', 404);

    await prisma.tripActivity.delete({
      where: { id: tripActivityId, stopId },
    });

    sendSuccess(res, null, 204);
  } catch (error) {
    if ((error as any).code === 'P2025') return sendError(res, 'TripActivity not found', 404);
    next(error);
  }
};
