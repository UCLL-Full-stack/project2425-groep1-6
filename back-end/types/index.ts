type Role = 'admin' | 'user' | 'guest' | 'worker';

type MovieInput = {
    id?: number;
    name: string;
    duration: Date;
    playingdates: Date[];
    genre: string;
    summary: string;
};

type RoomInput = {
    id?: number;
    name: string;
    chairs: number[];
};

type TaskInput = {
    id?: number;
    date: Date;
    time: Date;
    description: string;
    status: string;
    comment: string;
};

type TicketInput = {
    id?: number;
    price: number;
    date: Date;
    time: Date;
    chair: number;
};

type UserInput = {
    id?: number;
    username: string;
    email: string;
    password: string;
    role: Role;
};

type AuthenticationResponse = {
    token: string;
    username: string;
    role: string;
};

export { Role, MovieInput, RoomInput, TaskInput, TicketInput, UserInput, AuthenticationResponse };
