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

type VoteFormState = {
  id: string;
  value: string | string[];
}[];

type FormState = {
  pollForm: PollFormState;
  voteForm: VoteFormState;
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
  voteForm: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setPollForm(state, action) {
      state.pollForm = action.payload;
    },
    setVoteForm(state, action) {
      state.voteForm = action.payload;
    },
  },
});

export const { setPollForm, setVoteForm } = formSlice.actions;

export default formSlice.reducer;
