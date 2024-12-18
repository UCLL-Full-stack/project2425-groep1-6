import { Task } from '../model/Task';
import taskDb from '../repository/Task.db';

const getAllTasks = async (): Promise<Task[]> => {
    return taskDb.getAllTasks();
};

const getTaskById = async (id: number): Promise<Task> => {
    const task = await taskDb.getTaskById(id);
    if (!task) {
        throw new Error(`Task with id ${id} does not exist.`);
    }
    return task;
};

const addTask = async (
    date: Date,
    time: Date,
    description: string,
    status: string,
    comment: string,
    roomId: number
): Promise<Task> => {
    return taskDb.addTask(date, time, description, status, comment, roomId);
};

const assignTaskToUser = async (taskId: number, userId: number): Promise<Task> => {
    return taskDb.assignTaskToUser(taskId, userId);
};

const getTasksByUserId = async (userId: number): Promise<Task[]> => {
    return taskDb.getTasksByUserId(userId);
};

export default {
    getAllTasks,
    getTaskById,
    addTask,
    assignTaskToUser,
    getTasksByUserId,
};
