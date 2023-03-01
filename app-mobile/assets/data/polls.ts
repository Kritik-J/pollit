export const polls = [
    {
        id: 1,
        title: 'What is your favorite color?',
        inputType: 'radio',
        options: [
            { id: 1, value: 'Red' },
            { id: 2, value: 'Blue' },
            { id: 3, value: 'Green' },
            { id: 4, value: 'Yellow' }
        ],
        user: {
            id: 1,
            name: 'John Doe',
            userName: 'johndoe',
        },
        createdAt: '2022-03-01T00:00:00.000Z',
    },
    {
        id: 2,
        title: 'What is your favorite animal?',
        inputType: 'checkbox',
        options: [
            { id: 1, value: 'Dog' },
            { id: 2, value: 'Cat' },
            { id: 3, value: 'Tiger' },
            { id: 4, value: 'Lion' }
        ],
        user: {
            id: 1,
            name: 'John Doe',
            userName: 'johndoe',
        },
        createdAt: '2022-03-01T00:00:00.000Z',
    },
    {
        id: 3,
        title: 'What is your favorite food?',
        inputType: 'text',
        user: {
            id: 1,
            name: 'John Doe',
            userName: 'johndoe',
        },
        createdAt: '2022-03-01T00:00:00.000Z',
    }
];