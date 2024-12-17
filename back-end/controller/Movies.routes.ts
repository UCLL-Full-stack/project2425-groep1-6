/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the movie.
 *         name:
 *           type: string
 *           description: The name of the movie.
 *         duration:
 *           type: string
 *           description: Duration of the movie in HH:mm:ss format or its release date.
 *         playingdates:
 *           type: array
 *           items:
 *             type: string
 *             format: date-time
 *           description: List of dates when the movie is playing.
 *         genre:
 *           type: string
 *           description: Genre of the movie.
 *         summary:
 *           type: string
 *           description: A brief summary of the movie plot.
 *     MovieCreateRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the movie.
 *         duration:
 *           type: string
 *           format: date-time
 *           description: Duration or release date of the movie.
 *         playingdates:
 *           type: array
 *           items:
 *             type: string
 *             format: date-time
 *           description: List of dates when the movie is playing.
 *         genre:
 *           type: string
 *           description: Genre of the movie.
 *         summary:
 *           type: string
 *           description: A brief summary of the movie plot.
 *       required:
 *         - name
 *         - duration
 *         - playingdates
 *         - genre
 *         - summary
 */

import express, { NextFunction, Request, Response } from 'express';
import movieService from '../service/Movie.service';

const movieRouter = express.Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get a list of all movies.
 *     responses:
 *       200:
 *         description: A list of movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
movieRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movies = await movieService.getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The movie ID.
 *     responses:
 *       200:
 *         description: A movie object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found.
 */
movieRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movie = await movieService.getMovieById(Number(req.params.id));
        if (!movie) {
            res.status(404).json({ message: "Movie not found" });
            return;
        }
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Add a new movie.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: The details of the movie to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieCreateRequest'
 *     responses:
 *       201:
 *         description: Movie successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Bad request. Invalid input data.
 */
movieRouter.post('/', async (req, res, next) => {
    try {
      const movieName = req.body.name;
      const movieDuration = req.body.duration;
      const moviePlayingdates = req.body.playingdates;
      const movieGenre = req.body.genre;
      const movieSummary = req.body.summary;
      const newMovie = await movieService.addMovie(movieName,movieDuration, moviePlayingdates, movieGenre, movieSummary); 
      res.status(201).json(newMovie);
    } catch (error) {
      next(error);
    }
  });

export { movieRouter };
