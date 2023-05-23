import {Service} from 'typedi';

@Service()
export default class TodosService {
  public async getTodos() {
    const todos = {todo1: 'todo'};
    return todos;
  }
}
