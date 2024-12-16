import React, { use, useEffect, useState } from "react";
import { Movie } from "@/types";
import MovieService from "@/services/movieService";

const MovieOverviewTable: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = sessionStorage.getItem("loggedInUserToken");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await MovieService.getAllMovies(token);
        if (!response.ok) {
          throw new Error(`Could not fetch movies. Status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          throw new Error("Fetched data is not an array");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Genre</th>
          <th scope="col">Duration</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie, index) => (
          <tr key={index}>
            <td>{movie.name}</td>
            <td>{movie.genre}</td>
            <td>
              {typeof movie.duration === "string"
                ? new Date(movie.duration).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : movie.duration.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovieOverviewTable;
