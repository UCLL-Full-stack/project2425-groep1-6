import { Task } from "../../model/Task";
import { User as UserPrisma } from "@prisma/client";

test('given: valid values for task, when: task is created, then: task is created with those values', () => {
    const user: UserPrisma = {
        id: 1,
        username: "testuser",
        password: "password123",
        email: "testuser@example.com",
        role: "STUDENT"
    };

    const task = new Task({
        id: 1,
        date: new Date("2024-01-01"),
        time: new Date("2024-01-01T10:00:00"),
        description: "Complete the assignment",
        status: "Pending",
        comment: "Needs to be done by tomorrow",
        userId: user.id,
        user: user
    });

    expect(task.getId()).toBe(1);
    expect(task.getDate()).toEqual(new Date("2024-01-01"));
    expect(task.getTime()).toEqual(new Date("2024-01-01T10:00:00"));
    expect(task.getDescription()).toBe("Complete the assignment");
    expect(task.getStatus()).toBe("Pending");
    expect(task.getComment()).toBe("Needs to be done by tomorrow");
    expect(task.getUserId()).toBe(1);
    expect(task.getUser()).toEqual(user);
});

test('given: TaskPrisma object, when: from() is called, then: Task instance is created', () => {
    const user: UserPrisma = {
        id: 2,
        username: "anotheruser",
        password: "securepassword",
        email: "anotheruser@example.com",
        role: "LECTURER"
    };

    const taskPrisma = {
        id: 2,
        date: new Date("2024-02-01"),
        time: new Date("2024-02-01T14:00:00"),
        description: "Attend meeting",
        status: "Completed",
        comment: "Meeting with the team",
        userId: user.id,
        user: user,
        roomId: 1
    };

    const task = Task.from(taskPrisma);

    expect(task.getId()).toBe(2);
    expect(task.getDate()).toEqual(new Date("2024-02-01"));
    expect(task.getTime()).toEqual(new Date("2024-02-01T14:00:00"));
    expect(task.getDescription()).toBe("Attend meeting");
    expect(task.getStatus()).toBe("Completed");
    expect(task.getComment()).toBe("Meeting with the team");
    expect(task.getUserId()).toBe(2);
    expect(task.getUser()).toEqual(user);
});


test('given: a task, when: status is retrieved, then: correct status is returned', () => {
    const task = new Task({
        id: 1,
        date: new Date("2024-01-01"),
        time: new Date("2024-01-01T10:00:00"),
        description: "Submit project",
        status: "In Progress",
        comment: "Halfway through",
    });

    expect(task.getStatus()).toBe("In Progress");
});

test('given: a task with no user assigned, when: user details are retrieved, then: user details are undefined', () => {
    const task = new Task({
        id: 2,
        date: new Date(),
        time: new Date(),
        description: "Review code",
        status: "Pending",
        comment: "Check logic",
    });

    expect(task.getUser()).toBeUndefined();
    expect(task.getUserId()).toBeUndefined();
});

test('given: two identical tasks, when: properties are compared, then: values match', () => {
    const task1 = new Task({
        id: 3,
        date: new Date("2024-03-01"),
        time: new Date("2024-03-01T15:00:00"),
        description: "Deploy system",
        status: "Pending",
        comment: "Awaiting approval",
    });

    const task2 = new Task({
        id: 3,
        date: new Date("2024-03-01"),
        time: new Date("2024-03-01T15:00:00"),
        description: "Deploy system",
        status: "Pending",
        comment: "Awaiting approval",
    });

    expect(task1.getId()).toBe(task2.getId());
    expect(task1.getDate()).toEqual(task2.getDate());
    expect(task1.getTime()).toEqual(task2.getTime());
    expect(task1.getDescription()).toBe(task2.getDescription());
    expect(task1.getStatus()).toBe(task2.getStatus());
    expect(task1.getComment()).toBe(task2.getComment());
});
