import taskService from '../../service/Task.service';
import taskDb from '../../repository/Task.db';

jest.mock('../../repository/Task.db', () => ({
    getAllTasks: jest.fn(),
    getTaskById: jest.fn(),
    addTask: jest.fn(),
}));

describe('Task Service', () => {
    const mockTask = {
        id: 1,
        date: new Date('2024-01-01'),
        time: new Date('1970-01-01T08:00:00'),
        description: 'Clean the theater',
        status: 'Pending',
        comment: 'Scheduled for cleaning',
        roomId: 1,
    };

    test('getAllTasks: should return all tasks', async () => {
        (taskDb.getAllTasks as jest.Mock).mockResolvedValue([mockTask]);

        const tasks = await taskService.getAllTasks();
        expect(tasks).toEqual([mockTask]);
        expect(taskDb.getAllTasks).toHaveBeenCalledTimes(1);
    });

    test('getTaskById: should return the task when it exists', async () => {
        (taskDb.getTaskById as jest.Mock).mockResolvedValue(mockTask);

        const task = await taskService.getTaskById(1);
        expect(task).toEqual(mockTask);
        expect(taskDb.getTaskById).toHaveBeenCalledWith(1);
    });

    test('getTaskById: should throw an error when the task does not exist', async () => {
        (taskDb.getTaskById as jest.Mock).mockResolvedValue(null);

        await expect(taskService.getTaskById(999)).rejects.toThrow('Task with id 999 does not exist.');
        expect(taskDb.getTaskById).toHaveBeenCalledWith(999);
    });

    test('addTask: should add a task', async () => {
        (taskDb.addTask as jest.Mock).mockResolvedValue(mockTask);

        const newTask = await taskService.addTask(
            new Date('2024-01-01'),
            new Date('1970-01-01T08:00:00'),
            'Clean the theater',
            'Pending',
            'Scheduled for cleaning',
            1
        );

        expect(newTask).toEqual(mockTask);
        expect(taskDb.addTask).toHaveBeenCalledWith(
            new Date('2024-01-01'),
            new Date('1970-01-01T08:00:00'),
            'Clean the theater',
            'Pending',
            'Scheduled for cleaning',
            1
        );
    });
});
