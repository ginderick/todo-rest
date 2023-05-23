import {Service} from 'typedi';
import prisma from '../../prisma';

@Service()
export default class TodosService {
  public async getTodos(page: number, limit: number) {
    const todos = prisma.todo.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {dateCreated: 'desc'},
    });
    return todos;
  }

  public async getTodo(id: number) {
    const todo = prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    return todo;
  }

  public async addTodo(todo: any) {
    const dateCreated = new Date();
    const todoItem = prisma.todo.create({
      data: {
        name: todo.name,
        description: todo.description,
        remarks: todo.remarks,
        dateCreated: dateCreated,
      },
    });
    return todoItem;
  }
}
