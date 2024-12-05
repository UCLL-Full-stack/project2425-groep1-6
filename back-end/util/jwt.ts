import jwt from 'jsonwebtoken';
import { UserInput } from '../types';

const generateJWTtoken = ({ username, role }: UserInput): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_IN}h`, issuer: 'project2425-groep1-6' };

    try {
        return jwt.sign({ username, role }, process.env.JWT_SECRET!, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating token, see server log for details.');
    }
};

export { generateJWTtoken };
