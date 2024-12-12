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

export default {
    getAllTasks,
    getTaskById,
};
