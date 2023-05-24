import {prismaMock} from '../../singleton';
import TodosService from '../../../src/services/todos';
import {todoList, user, userPayload, todo, todoPayload, completedTodo} from '../../utils/utils';

describe('Todo service', () => {
  it('should return all todo items', async () => {
    prismaMock.todo.findMany.mockResolvedValue(todoList);
    const todosService = new TodosService();

    const page = 1;
    const limit = 10;

    const todos = todosService.getTodos(page, limit);

    await expect(todos).resolves.toEqual(todoList);
  });

  it('should return a todo item based on id', async () => {
    prismaMock.todo.findUnique.mockResolvedValue(todo);
    const todosService = new TodosService();
    const id = todo.id;

    const todoItem = todosService.getTodo(id);

    await expect(todoItem).resolves.toEqual(todo);
  });

  it('should create a todo item and return its value', async () => {
    prismaMock.todo.create.mockResolvedValue(todo);
    const todosService = new TodosService();

    const todoItem = todosService.addTodo(todoPayload);

    await expect(todoItem).resolves.toEqual(todo);
  });

  it('should delete a todo item and return its value', async () => {
    prismaMock.todo.delete.mockResolvedValue(todo);
    const todosService = new TodosService();

    const id = todo.id;

    const todoItem = todosService.deleteTodo(id);

    await expect(todoItem).resolves.toEqual(todo);
  });

  it('should update a todo item with a date completed and return its value', async () => {
    prismaMock.todo.update.mockResolvedValue(completedTodo);
    const todosService = new TodosService();

    const id = todo.id;
    const dateCompleted = new Date('2023-05-25T05:27:49.524Z');

    const todoItem = todosService.completeTodo(id, dateCompleted);

    await expect(todoItem).resolves.toEqual(completedTodo);
  });
});
