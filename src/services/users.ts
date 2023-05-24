import bcrypt from 'bcrypt';
import prisma from '../../prisma';
import {Service} from 'typedi';
import {UserCreate} from '../types';

type userAdded = {
  id: number;
  username: string;
  hashed_password: string;
};

@Service()
export default class UsersService {
  public async addUser(user: UserCreate) {
    const hashed_password = await bcrypt.hash(user.password, 10);
    const {password, ...userBody} = user;

    const userCreate = {
      ...userBody,
      hashed_password: hashed_password,
    };
    const userAdded: userAdded = await prisma.user.create({
      data: {
        username: userBody.username,
        hashed_password: userCreate.hashed_password,
      },
    });

    const {username} = userAdded;

    return username;
  }
}
