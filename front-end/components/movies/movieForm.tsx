import { useState } from "react";
import MovieService from "@/services/movieService";
import { Movie } from "@/types";
import { useTranslation } from "next-i18next";

const MovieForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [hours, setHours] = useState<number | string>("");
  const [minutes, setMinutes] = useState<number | string>("");
  const [playingdates, setPlayingdates] = useState<string[]>([""]);
  const [genre, setGenre] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const { t } = useTranslation();

  const handleAddMovie = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const totalDuration = new Date();
    totalDuration.setHours(Number(hours));
    totalDuration.setMinutes(Number(minutes));
    const validPlayingDates = playingdates.filter((date) => date.trim() !== "");

    const newMovie: Movie = {
      name,
      duration: totalDuration,
      playingdates: validPlayingDates.map((date) => new Date(date)),
      genre,
      summary,
    };

    try {
      const token = sessionStorage.getItem("loggedInUserToken");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await MovieService.addMovie(newMovie, token);
      if (!response.ok) {
        throw new Error("Failed to create movie");
      }
      const createdMovie = await response.json();
      console.log("Movie created:", createdMovie);
      setName("");
      setHours("");
      setMinutes("");
      setPlayingdates([""]);
      setGenre("");
      setSummary("");
      setSuccess("Movie created successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handlePlayingDateChange = (index: number, value: string) => {
    const updatedDates = [...playingdates];
    updatedDates[index] = value;
    setPlayingdates(updatedDates);
  };

  const handleAddPlayingDateField = () => {
    setPlayingdates([...playingdates, ""]);
  };

  const handleRemovePlayingDateField = (index: number) => {
    setPlayingdates(playingdates.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleAddMovie} className="block w-full">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
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
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              min={0}
              required
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <p className="text-xl">:</p>
            <input
              type="number"
              placeholder="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              min={0}
              max={59}
              required
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </label>
      </div>
      <div className="p-1 block mb-2 text-sm font-medium">
        <label>
          {t("movies.form.playingdates")}
          {playingdates.map((date, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="date"
                value={date}
                onChange={(e) => handlePlayingDateChange(index, e.target.value)}
                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <button
                type="button"
                onClick={() => handleRemovePlayingDateField(index)}
                className="bg-red-500 text-white p-1 rounded-lg"
              >
                {t("movies.form.remove")}
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddPlayingDateField}
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            {t("movies.form.add_date")}
          </button>
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
      <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">
        {t("movies.form.button")}
      </button>
    </form>
  );
};

export default MovieForm;
