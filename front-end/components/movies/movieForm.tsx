import { useState } from 'react';
import MovieService from '@/services/movieService';
import { Movie } from '@/types';
import { useTranslation } from "react-i18next";

const MovieForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [duration, setDuration] = useState<Date>(new Date());
  const [playingdates, setPlayingdates] = useState<Date[]>([]);
  const [genre, setGenre] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { t } = useTranslation();

  const handleAddMovie = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    
    const newMovie: Movie = {
      name,
      duration,
      playingdates,
      genre,
      summary,
    };

    try {
      const response = await MovieService.addMovie(newMovie);
      if (!response.ok) {
        throw new Error('Failed to create movie');
      }
      const createdMovie = await response.json();
      console.log('Movie created:', createdMovie);
      setName('');
      setDuration(new Date());
      setPlayingdates([]);
      setGenre('');
      setSummary('');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleAddPlayingDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setPlayingdates([...playingdates, date]);
  };

  return (
    <form onSubmit={handleAddMovie} className="block w-full">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="p-1 block mb-2 text-sm font-medium">
        <label>
          {t("movies.form.name")}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </label>
      </div>
      <div className="p-1 block mb-2 text-sm font-medium">
        <label>
          {t("movies.form.duration")}
          <input
            type="time"
            value={duration.getTime()}
            onChange={(e) => setDuration(new Date(e.target.value))}
            required
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </label>
      </div>
      <div className="p-1 block mb-2 text-sm font-medium">
        <label>
          {t("movies.form.playingdates")}
          <input type="date" onChange={handleAddPlayingDate} className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
          <ul>
            {playingdates.map((date, index) => (
              <li key={index}>{date.toISOString().substring(0, 10)}</li>
            ))}
          </ul>
        </label>
      </div>
      <div className="p-1 block mb-2 text-sm font-medium">
        <label>
          {t("movies.form.genre")}
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </label>
      </div>
      <div className="p-1 block mb-2 text-sm font-medium">
        <label>
          {t("movies.form.summary")}
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </label>
      </div>
      <button type="submit">{t("movies.form.button")}</button>
    </form>
  );
};

export default MovieForm;
