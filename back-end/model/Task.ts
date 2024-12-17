import { Task as TaskPrisma, User as UserPrisma } from "@prisma/client";

export class Task {
    private id?: number;
    private date: Date;
    private time: Date;
    private description: string;
    private status: string;
    private comment: string;
    private userId?: number | null; // Nullable foreign key
    private user?: UserPrisma;      // Optionele relatie naar User

    constructor(task: {
        id?: number;
        date: Date;
        time: Date;
        description: string;
        status: string;
        comment: string;
        userId?: number | null;
        user?: UserPrisma;
    }) {
        this.id = task.id;
        this.date = task.date;
        this.time = task.time;
        this.description = task.description;
        this.status = task.status;
        this.comment = task.comment;
        this.userId = task.userId;
        this.user = task.user;
    }

    getId(): number | undefined {
        return this.id;
    }

    getDate(): Date {
        return this.date;
    }

    getTime(): Date {
        return this.time;
    }

    getDescription(): string {
        return this.description;
    }

    getStatus(): string {
        return this.status;
    }

    getComment(): string {
        return this.comment;
    }

    getUserId(): number | null | undefined {
        return this.userId;
    }

    getUser(): UserPrisma | undefined {
        return this.user;
    }

    static from({
        id,
        date,
        time,
        description,
        status,
        comment,
        userId,
        user,
    }: TaskPrisma & { user?: UserPrisma }) {
        return new Task({
            id,
            date,
            time,
            description,
            status,
            comment,
            userId,
            user,
        });
    }
}