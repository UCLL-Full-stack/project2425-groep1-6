import movieService from '../../service/Movie.service';
import movieDb from '../../repository/Movie.db';

jest.mock('../../repository/Movie.db', () => ({
    getAllMovies: jest.fn(),
    getMovieById: jest.fn(),
    addMovie: jest.fn(),
}));

describe('Movie Service', () => {
    const mockMovie = {
        id: 1,
        name: 'Inception',
        duration: new Date('1970-01-01T02:28:00'),
        playingdates: [new Date('2024-01-01')],
        genre: 'Sci-Fi',
        summary: 'A mind-bending thriller.',
    };

    test('getAllMovies: should return all movies', async () => {
        (movieDb.getAllMovies as jest.Mock).mockResolvedValue([mockMovie]);

        const movies = await movieService.getAllMovies();
        expect(movies).toEqual([mockMovie]);
        expect(movieDb.getAllMovies).toHaveBeenCalledTimes(1);
    });

    test('getMovieById: should return the movie when it exists', async () => {
        (movieDb.getMovieById as jest.Mock).mockResolvedValue(mockMovie);

        const movie = await movieService.getMovieById(1);
        expect(movie).toEqual(mockMovie);
        expect(movieDb.getMovieById).toHaveBeenCalledWith(1);
    });

    test('getMovieById: should throw an error when the movie does not exist', async () => {
        (movieDb.getMovieById as jest.Mock).mockResolvedValue(null);

        await expect(movieService.getMovieById(999)).rejects.toThrow('Movie with id 999 does not exist.');
        expect(movieDb.getMovieById).toHaveBeenCalledWith(999);
    });

    test('addMovie: should add a movie', async () => {
        (movieDb.addMovie as jest.Mock).mockResolvedValue(mockMovie);

        const newMovie = await movieService.addMovie(
            'Inception',
            new Date('1970-01-01T02:28:00'),
            [new Date('2024-01-01')],
            'Sci-Fi',
            'A mind-bending thriller.'
        );

        expect(newMovie).toEqual(mockMovie);
        expect(movieDb.addMovie).toHaveBeenCalledWith(
            'Inception',
            new Date('1970-01-01T02:28:00'),
            [new Date('2024-01-01')],
            'Sci-Fi',
            'A mind-bending thriller.'
        );
    });
});
