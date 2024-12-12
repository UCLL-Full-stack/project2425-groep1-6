import { Movie } from '../model/Movie';
import movieDb from '../repository/Movie.db';

const getAllMovies = async (): Promise<Movie[]> => {
    return movieDb.getAllMovies();
};

const getMovieById = async (id: number): Promise<Movie> => {
    const movie = await movieDb.getMovieById(id);
    if (!movie) {
        throw new Error(`Movie with id ${id} does not exist.`);
    }
    return movie;
};

const addMovie = async (
    name: string,
    duration: Date,
    playingdates: Array<Date>,
    genre: string,
    summary: string
): Promise<Movie> => {
    return movieDb.addMovie(name, duration, playingdates, genre, summary);
};

export default {
    getAllMovies,
    getMovieById,
    addMovie,
};
