import {Request, Response, NextFunction} from 'express';
import catchAsync from '../utils/catchAsync.js';
import Poll from '../models/poll.model.js';
import Question from '../models/question.model.js';
import errorHandler from '../utils/errorHandler.js';
import {UserRequest} from '../../interfaces.js';
import {checkNull} from '../utils/validators.js';

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
    const {title, questions, pollType, startAt, endAt} = req.body;

    if (
      checkNull(title) ||
      checkNull(pollType) ||
      checkNull(startAt) ||
      checkNull(endAt)
    ) {
      return next(new errorHandler('Please fill all fields', 400));
    }

    if (questions.length < 1) {
      return next(new errorHandler('Please add at least one question', 400));
    }

    if (new Date(startAt) > new Date(endAt)) {
      return next(new errorHandler('Invalid date', 400));
    }

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
      pollType: pollType,
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
    let poll = await Poll.findById(req.params.id)
      .populate('createdBy')
      .populate({
        path: 'questions',
      });

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
  async (req: Request, res: Response, next: NextFunction) => {
    const poll = await Poll.findById(req.params.id)
      .populate('createdBy')
      .populate({
        path: 'questions',
        populate: {
          path: 'votes.voterId',
          select: 'userName',
        },
      });

    if (!poll) {
      return next(new errorHandler('Poll not found', 404));
    }

    res.status(200).json({
      status: 'success',
      poll,
    });
  },
);

export const votePoll = catchAsync(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const {votes} = req.body;

    const poll = await Poll.findById(id);

    if (!poll) {
      return next(new errorHandler('Poll not found', 404));
    }

    // @ts-ignore
    const isVoted = poll.voters.includes(req.user._id);

    if (isVoted) {
      return next(new errorHandler('You already voted', 400));
    }

    // check if all fields are filled

    let totalVotes = 0;

    votes.forEach(async (vote: any) => {
      if (vote.value === '' || vote.value.length === 0) {
        totalVotes += 1;
      }
    });

    if (totalVotes > 0) {
      return next(new errorHandler('Please fill all fields', 400));
    }

    // update poll and questions

    const updatedPoll = await Poll.findByIdAndUpdate(
      id,
      {
        $push: {voters: req.user._id},
      },
      {new: true},
    )
      .populate('createdBy')
      .populate('questions');

    if (!updatedPoll) {
      return next(new errorHandler('Something went wrong', 500));
    }

    const updatedQuestions = await Promise.all(
      votes.map(async (vote: any) => {
        const updateQuestion = await Question.findByIdAndUpdate(
          vote.id,
          {
            $push: {
              votes: {
                voterId: req.user._id,
                textAnswer: !Array.isArray(vote.value) && vote.value,
                optionAnswer: Array.isArray(vote.value) && vote.value,
              },
            },
          },
          {new: true},
        );

        return updateQuestion;
      }),
    );

    if (!updatedQuestions) {
      return next(new errorHandler('Something went wrong', 500));
    }

    res.status(200).json({
      status: 'success',
      poll: updatedPoll,
      questions: updatedQuestions,
    });
  },
);
