import {prismaMock} from '../../singleton';
import UsersService from '../../../src/services/users';
import {user, userPayload} from '../../utils/utils';

describe('User service', () => {
  it('should return the username of the added user', async () => {
    prismaMock.user.create.mockResolvedValue(user);
    const usersService = new UsersService();

    const addedUser = usersService.addUser(userPayload);

    await expect(addedUser).resolves.toEqual(user.username);
  });
});
