import {Request, Response, NextFunction} from 'express';
import catchAsync from '../utils/catchAsync.js';
import Poll from '../models/poll.model.js';
import Question from '../models/question.model.js';
import errorHandler from '../utils/errorHandler.js';
import {UserRequest} from '../../interfaces.js';

export const getPolls = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const polls = await Poll.find().populate('createdBy');

    res.status(200).json({
      status: 'success',
      results: polls.length,
      polls,
    });
  },
);

export const createPoll = catchAsync(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    const {title, questions, startAt, endAt} = req.body;

    // TODO: add validation for startAt and endAt
    // TODO: add validation for questions
    // TODO: add validation for title

    const questionsIds = await Promise.all(
      questions.map(async (question: any) => {
        const newQuestion = await Question.create({
          ...question,
          createdBy: req.user._id,
        });

        return newQuestion._id;
      }),
    );

    if (!questionsIds) {
      return next(new errorHandler('Something went wrong', 500));
    }

    const newPoll = await Poll.create({
      title,
      questions: questionsIds,
      createdBy: req.user._id,
      startAt,
      endAt,
    });

    if (!newPoll) {
      return next(new errorHandler('Something went wrong', 500));
    }

    res.status(201).json({
      status: 'success',
      poll: newPoll,
    });
  },
);

export const getPoll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const poll = await Poll.findById(req.params.id)
      .populate('createdBy')
      .populate('questions');

    if (!poll) {
      return next(new errorHandler('Poll not found', 404));
    }

    res.status(200).json({
      status: 'success',
      poll,
    });
  },
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
