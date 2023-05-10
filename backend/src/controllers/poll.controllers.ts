import {Request, Response, NextFunction} from 'express';
import catchAsync from '../utils/catchAsync.js';

export const getPolls = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const createPoll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const getPoll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const updatePoll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const deletePoll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const pollResult = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const answerPoll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
