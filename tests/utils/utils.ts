export const user = {
  id: 1,
  username: 'ginderick',
  hashed_password: '$2b$10$yHtyfSVWK3IcBNmNw.Glx.NzRitAPrpk5SXZjlioMIUcuGlSKwPo2',
};

export const loginPayload = {
  username: 'ginderick',
  password: 'Test123!',
};

export const userPayload = {
  username: 'ginderick',
  password: 'Test123!',
};

export const loginWrongPasswordPayload = {
  username: 'ginderick',
  password: 'Test123',
};

export const todoList = [
  {
    id: 1,
    name: 'todo1',
    description: 'todo1 description',
    remarks: 'todo1 remarks',
    dateCreated: new Date(),
    dateCompleted: null,
  },
  {
    id: 2,
    name: 'todo2',
    description: 'todo2 description',
    remarks: 'todo2 remarks',
    dateCreated: new Date(),
    dateCompleted: null,
  },
  {
    id: 3,
    name: 'todo3',
    description: 'todo3 description',
    remarks: 'todo3 remarks',
    dateCreated: new Date(),
    dateCompleted: null,
  },
];

export const todo = {
  id: 1,
  name: 'todo1',
  description: 'todo1 description',
  remarks: 'todo1 remarks',
  dateCreated: new Date(),
  dateCompleted: null,
};

export const todoPayload = {
  name: 'todo1',
  description: 'todo1 description',
  remarks: 'todo1 remarks',
};

export const todoItem = {
  id: 1,
  name: 'todo1',
  description: 'todo1 description',
  remarks: 'todo1 remarks',
  dateCreated: new Date('2023-05-24T05:27:49.524Z'),
  dateCompleted: null,
};

export const completeTodoPayload = {
  dateCompleted: '2023-05-25T05:27:49.524Z',
};

export const completedTodo = {
  id: 1,
  name: 'todo1',
  description: 'todo1 description',
  remarks: 'todo1 remarks',
  dateCreated: new Date('2023-05-24T05:27:49.524Z'),
  dateCompleted: new Date('2023-05-25T05:27:49.524Z'),
};
