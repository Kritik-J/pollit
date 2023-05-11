import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    isRequired: {
      type: Boolean,
      default: true,
    },

    answerType: {
      type: String,
      enum: ['radio', 'text', 'checkbox'],
      default: 'text',
    },

    options: [
      {
        id: String,
        value: String,
      },
    ],

    votes: [
      {
        voterId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },

        textAnswer: {
          type: String,
        },

        optionAnswer: [
          {
            type: String,
          },
        ],
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },

  {timestamps: true},
);

const Question = mongoose.model('Question', questionSchema);

export default Question;
