export const polls = [
  {
    id: 1,
    title: "Favorite things",
    questions: [
      {
        id: 1,
        title: "What is your favorite color?",
        inputType: "radio",
        options: [
          { id: 1, value: "Red" },
          { id: 2, value: "Blue" },
          { id: 3, value: "Green" },
          { id: 4, value: "Yellow" },
        ],
      },

      {
        id: 2,
        title: "What is your favorite food?",
        inputType: "text",
      },

      {
        id: 3,
        title: "What is your favorite animal?",
        inputType: "checkbox",
        options: [
          { id: 1, value: "Dog" },
          { id: 2, value: "Cat" },
          { id: 3, value: "Tiger" },
          { id: 4, value: "Lion" },
        ],
      },

      {
        id: 4,
        title: "What is your favorite movie?",
        inputType: "text",
      },

      {
        id: 5,
        title: "What is your favorite sport?",
        inputType: "radio",
        options: [
          { id: 1, value: "Football" },
          { id: 2, value: "Basketball" },
          { id: 3, value: "Baseball" },
          { id: 4, value: "Tennis" },
        ],
      },

      {
        id: 6,
        title: "What is your favorite season?",
        inputType: "checkbox",
        options: [
          { id: 1, value: "Spring" },
          { id: 2, value: "Summer" },
          { id: 3, value: "Fall" },
          { id: 4, value: "Winter" },
        ],
      },
    ],
    user: {
      id: 1,
      name: "John Doe",
      userName: "johndoe",
    },
    createdAt: "2022-03-01T00:00:00.000Z",
  },

  {
    id: 2,
    title: "What if?",
    questions: [
      {
        id: 1,
        title: "What if time travel was possible?",
        inputType: "radio",
        options: [
          { id: 1, value: "I would go back in time" },
          { id: 2, value: "I would go to the future" },
          { id: 3, value: "I would not go anywhere" },
        ],
      },

      {
        id: 2,
        title: "What if you became a president?",
        inputType: "text",
      },

      {
        id: 3,
        title: "What if AI took over the world?",
        inputType: "checkbox",
        options: [
          { id: 1, value: "I would fight back" },
          { id: 2, value: "I would hide" },
          { id: 3, value: "I would surrender" },
        ],
      },
    ],
    user: {
      id: 1,
      name: "John Doe",
      userName: "johndoe",
    },
    createdAt: "2022-03-01T00:00:00.000Z",
  },
];
