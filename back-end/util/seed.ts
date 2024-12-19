import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import path from 'path';
import bcrypt from 'bcrypt';

// Load environment variables
config({ path: path.resolve(__dirname, '../../.env') });

const prisma = new PrismaClient();

async function main() {
    // Seed Movies
    const movies = await Promise.all([
        prisma.movie.create({
            data: {
                name: 'Inception',
                duration: new Date('2024-12-31T02:30:00.000Z'),
                playingdates: [
                    new Date('2024-12-20T19:00:00.000Z'),
                    new Date('2024-12-21T21:00:00.000Z'),
                ],
                genre: 'Science Fiction',
                summary: 'A mind-bending thriller',
            },
        }),
        prisma.movie.create({
            data: {
                name: 'The Dark Knight',
                duration: new Date('2024-12-31T02:30:00.000Z'),
                playingdates: [new Date('2024-12-22T19:00:00.000Z')],
                genre: 'Action',
                summary: 'Batman faces the Joker in Gotham City.',
            },
        }),
        prisma.movie.create({
            data: {
                name: 'Interstellar',
                duration: new Date('2024-12-31T02:50:00.000Z'),
                playingdates: [
                    new Date('2024-12-23T20:00:00.000Z'),
                    new Date('2024-12-24T22:00:00.000Z'),
                ],
                genre: 'Sci-Fi',
                summary: 'Exploring space to save humanity.',
            },
        }),
        prisma.movie.create({
            data: {
                name: 'Dune',
                duration: new Date('2024-12-31T03:00:00.000Z'),
                playingdates: [new Date('2024-12-25T18:30:00.000Z')],
                genre: 'Adventure',
                summary: 'A desert planet full of intrigue and danger.',
            },
        }),
        prisma.movie.create({
            data: {
                name: 'The Matrix',
                duration: new Date('2024-12-31T02:20:00.000Z'),
                playingdates: [new Date('2024-12-26T21:00:00.000Z')],
                genre: 'Sci-Fi',
                summary: 'A hacker discovers the truth about his world.',
            },
        }),
    ]);

    // Seed Rooms
    const rooms = await Promise.all([
        prisma.room.create({ data: { name: 'Room 1', chairs: [1, 2, 3, 4, 5] } }),
        prisma.room.create({ data: { name: 'Room 2', chairs: [6, 7, 8, 9, 10] } }),
        prisma.room.create({ data: { name: 'Room 3', chairs: [11, 12, 13, 14, 15] } }),
        prisma.room.create({ data: { name: 'Room 4', chairs: [16, 17, 18, 19, 20] } }),
        prisma.room.create({ data: { name: 'Room 5', chairs: [21, 22, 23, 24, 25] } }),
    ]);

    // Seed Tasks
    const tasks = await Promise.all([
        prisma.task.create({
            data: {
                date: new Date('2024-12-25'),
                time: new Date('2024-12-25T10:00:00.000Z'),
                description: 'Clean Room 1',
                status: 'Open',
                comment: 'Clean before next movie',
                roomId: rooms[0].id,
            },
        }),
        prisma.task.create({
            data: {
                date: new Date('2024-12-26'),
                time: new Date('2024-12-26T10:00:00.000Z'),
                description: 'Check projector in Room 2',
                status: 'Open',
                comment: 'No issues found',
                roomId: rooms[1].id,
            },
        }),
        prisma.task.create({
            data: {
                date: new Date('2024-12-27'),
                time: new Date('2024-12-27T09:00:00.000Z'),
                description: 'Arrange chairs in Room 3',
                status: 'Open',
                comment: 'Ensure proper alignment',
                roomId: rooms[2].id,
            },
        }),
        prisma.task.create({
            data: {
                date: new Date('2024-12-28'),
                time: new Date('2024-12-28T08:30:00.000Z'),
                description: 'Clean carpets in Room 4',
                status: 'Open',
                comment: 'Use vacuum cleaner',
                roomId: rooms[3].id,
            },
        }),
        prisma.task.create({
            data: {
                date: new Date('2024-12-29'),
                time: new Date('2024-12-29T12:00:00.000Z'),
                description: 'Fix sound system in Room 5',
                status: 'Open',
                comment: 'Speakers not working properly',
                roomId: rooms[4].id,
            },
        }),
    ]);

    // Seed Tickets
    const tickets = await Promise.all([
        prisma.ticket.create({
            data: {
                price: 12.5,
                date: new Date(),
                time: new Date(),
                chair: 1,
                movieId: movies[0].id,
            },
        }),
        prisma.ticket.create({
            data: {
                price: 10.0,
                date: new Date(),
                time: new Date(),
                chair: 2,
                movieId: movies[0].id,
            },
        }),
        prisma.ticket.create({
            data: {
                price: 15.0,
                date: new Date(),
                time: new Date(),
                chair: 3,
                movieId: movies[1].id,
            },
        }),
        prisma.ticket.create({
            data: {
                price: 8.0,
                date: new Date(),
                time: new Date(),
                chair: 4,
                movieId: movies[2].id,
            },
        }),
        prisma.ticket.create({
            data: {
                price: 20.0,
                date: new Date(),
                time: new Date(),
                chair: 5,
                movieId: movies[3].id,
            },
        }),
    ]);

    // Seed Users
    const users = await Promise.all([
        prisma.user.create({
            data: {
                username: 'admin',
                password: await bcrypt.hash('password123', 12),
                email: 'admin1@example.com',
                role: 'admin',
            },
        }),
        prisma.user.create({
            data: {
                username: 'guest',
                password: await bcrypt.hash('password123', 12),
                email: 'guest1@example.com',
                role: 'guest',
            },
        }),
        prisma.user.create({
            data: {
                username: 'worker',
                password: await bcrypt.hash('password123', 12),
                email: 'worker1@example.com',
                role: 'worker',
            },
        }),
        prisma.user.create({
            data: {
                username: 'user',
                password: await bcrypt.hash('password123', 12),
                email: 'user@example.com',
                role: 'user',
            },
        }),
        prisma.user.create({
            data: {
                username: 'admin2',
                password: await bcrypt.hash('password123', 12),
                email: 'admin2@example.com',
                role: 'admin',
            },
        }),
        prisma.user.create({
            data: {
                username: 'guest2',
                password: await bcrypt.hash('password123', 12),
                email: 'guest2@example.com',
                role: 'guest',
            },
        }),
    ]);

    console.log('Seeding completed successfully!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
