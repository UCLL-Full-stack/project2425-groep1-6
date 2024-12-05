import { User } from '../model/User';
import userDb from '../repository/User.db';
import bcrypt from 'bcrypt';
import { AuthenticationResponse, UserInput } from '../types';
import { generateJWTtoken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => {
    return userDb.getAllUsers();
};

const getUserById = async (id: number): Promise<User> => {
    const user = await userDb.getUserById(id);
    if (!user) {
        throw new Error(`User with id ${id} does not exist.`);
    }
    return user;
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDb.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const createUser = async ({ username, password, email, role }: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByUsername({ username });

    if (existingUser) {
        throw new Error(`User with username ${username} is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        username,
        password: hashedPassword,
        email,
        role,
    });

    return await userDb.createUser(user);
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });

    const isValidPassword = await bcrypt.compare(password, user.getPassword());
    if (!isValidPassword) {
        throw new Error('Incorrect password');
    }

    const role = user.getRole();

    return {
        token: generateJWTtoken({ username, role } as UserInput),
        username,
        role,
    };
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    getUserByUsername,
    authenticate,
};
