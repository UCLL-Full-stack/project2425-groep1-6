import { PrismaClient } from '@prisma/client';
import { Movie } from '../model/Movie';

const database = new PrismaClient();

const getAllMovies = async (): Promise<Movie[]> => {
    try {
        const moviesPrisma = await database.movie.findMany({});
        return moviesPrisma.map((moviePrisma) => Movie.from(moviePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getMovieById = async (id: number): Promise<Movie | null> => {
    try {
        const moviePrisma = await database.movie.findUnique({
            where: { id },
        });
        return moviePrisma ? Movie.from(moviePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addMovie = async (
    name: string,
    duration: Date,
    playingdates: Date[],
    genre: string,
    summary: string
): Promise<Movie> => {
    try {
        const moviePrisma = await database.movie.create({
            data: {
                name,
                duration,
                playingdates,
                genre,
                summary,
            },
        });
        return Movie.from(moviePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllMovies,
    getMovieById,
    addMovie,
};
