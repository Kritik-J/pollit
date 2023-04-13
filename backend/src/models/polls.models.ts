import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    voters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    startAt: {
      type: Date,
      default: Date.now(),
    },

    endAt: {
      type: Date,
      default: Date.now() + 86400000 * 2,
    },

    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  },
  {timestamps: true},
);

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;
