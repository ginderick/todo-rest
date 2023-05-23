import bcrypt from 'bcrypt';
import prisma from '../../prisma';
import {Service} from 'typedi';

type userAdded = {
  id: number;
  username: string;
  hashed_password: string;
};

@Service()
export default class UsersService {
  public async addUser(user: any) {
    const hashed_password = await bcrypt.hash(user.password, 10);
    const {password, ...userBody} = user;

    userBody.hashed_password = hashed_password;

    const userAdded: userAdded = await prisma.user.create({
      data: {
        username: userBody.username,
        hashed_password: userBody.hashed_password,
      },
    });

    const {username} = userAdded;

    return username;
  }
}
