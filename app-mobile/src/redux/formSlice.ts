import { createSlice } from "@reduxjs/toolkit";

type PollFormState = {
  title: string;
  questions: {
    id: string;
    question: string;
    answerType: string;
    required?: boolean;
    options?: [
      {
        id: string;
        value: string;
      }
    ];
  }[];
  startAt: string;
  endAt: string;
};

type FormState = {
  pollForm: PollFormState;
};

const initialState: FormState = {
  pollForm: {
    title: "",
    questions: [
      {
        id: "1",
        question: "",
        answerType: "",
      },
    ],
    startAt: "",
    endAt: "",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setPollForm(state, action) {
      state.pollForm = action.payload;
    },
  },
});

export const { setPollForm } = formSlice.actions;

export default formSlice.reducer;
