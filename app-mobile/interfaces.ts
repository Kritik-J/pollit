export interface IUser {
  _id: string;
  name: string;
  userName: string;
  avatar: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  role: string;
}

export interface IPoll {
  title: string;
  questions: {
    _id: string;
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
  voters: string[];
  startAt: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
  createdBy: IUser;
  pollType: String;
}
