import {Service} from 'typedi';
import prisma from '../../prisma';

@Service()
export default class TodosService {
  public async getTodos() {
    const todos = prisma.todo.findMany({});
    return todos;
  }
}
