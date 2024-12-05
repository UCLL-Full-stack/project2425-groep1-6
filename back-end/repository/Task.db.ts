import { PrismaClient } from '@prisma/client';
import { Task } from '../model/Task';

const database = new PrismaClient();

const getAllTasks = async (): Promise<Task[]> => {
    try {
        const tasksPrisma = await database.task.findMany({});
        return tasksPrisma.map((taskPrisma) => Task.from(taskPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getTaskById = async (id: number): Promise<Task | null> => {
    try {
        const taskPrisma = await database.task.findUnique({
            where: { id },
        });
        return taskPrisma ? Task.from(taskPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addTask = async (
    date: Date,
    time: Date,
    description: string,
    status: string,
    comment: string,
    roomId: number
): Promise<Task> => {
    try {
        const roomExists = await database.room.findUnique({ where: { id: roomId } });
        if (!roomExists) {
            throw new Error('Room with the specified ID does not exist.');
        }

        const taskPrisma = await database.task.create({
            data: {
                date,
                time,
                description,
                status,
                comment,
                roomId,
            }

        });
        return Task.from(taskPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllTasks,
    getTaskById,
    addTask,
};
