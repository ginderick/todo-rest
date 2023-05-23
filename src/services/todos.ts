import {Service} from 'typedi';
import prisma from '../../prisma';

@Service()
export default class TodosService {
  public async getTodos() {
    const todos = prisma.todo.findMany({});
    return todos;
  }

  public async addTodo(todo: any) {
    const todoItem = prisma.todo.create({
      data: {
        name: todo.name,
        description: todo.description,
        remarks: todo.remarks,
        dateCreated: todo.dateCreated,
      },
    });
    return todoItem;
  }
}
