import userService from '../../service/User.service';
import userDb from '../../repository/User.db';
import bcrypt from 'bcrypt';

jest.mock('../../repository/User.db', () => ({
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    getUserByUsername: jest.fn(),
    createUser: jest.fn(),
}));
jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

describe('User Service', () => {
    const mockUser = {
        id: 1,
        username: 'testuser',
        password: 'hashedpassword',
        email: 'test@example.com',
        role: 'user',
    };

    test('getAllUsers: should return all users', async () => {
        (userDb.getAllUsers as jest.Mock).mockResolvedValue([mockUser]);

        const users = await userService.getAllUsers();
        expect(users).toEqual([mockUser]);
        expect(userDb.getAllUsers).toHaveBeenCalledTimes(1);
    });

    test('getUserById: should return the user when it exists', async () => {
        (userDb.getUserById as jest.Mock).mockResolvedValue(mockUser);

        const user = await userService.getUserById(1);
        expect(user).toEqual(mockUser);
        expect(userDb.getUserById).toHaveBeenCalledWith(1);
    });

    test('createUser: should hash password and create user', async () => {
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
        (userDb.createUser as jest.Mock).mockResolvedValue(mockUser);

        const newUser = await userService.createUser({
            username: 'testuser',
            password: 'password123',
            email: 'test@example.com',
            role: 'user',
        });

        expect(newUser).toEqual(mockUser);
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12);
        expect(userDb.createUser).toHaveBeenCalledWith(
            {username:'testuser',
            password:'hashedpassword',
            email:'test@example.com',
            role:'user'}
        );
    });
});
