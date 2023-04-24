import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    isRequired: {
      type: Boolean,
      default: false,
    },

    answerType: {
      type: String,
      enum: ['radio', 'text', 'checkbox'],
      default: 'text',
    },

    options: [
      {
        type: String,
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
  },
  {timestamps: true},
);

const Question = mongoose.model('Question', questionSchema);
