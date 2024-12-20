import React from "react";
import { Movie } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

type Props = {
  movies: Array<Movie> | null | undefined; // Toegestane types voor robustness
};

const MovieOverviewTable: React.FC<Props> = ({ movies }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();

  if (!Array.isArray(movies) || movies.length === 0) {
    return <p>{t("movies.overview.nomovies")}</p>; // Fallback voor geen data
  }

  const handleRowClick = (movie: Movie) => {
    router.push({
      pathname: "/tickets",
      query: {
        id: movie.id, // Assuming each movie has a unique ID
        moviename: movie.name,
        playingdates: JSON.stringify(movie.playingdates), // Serialize dates to pass as query
      },
    });
  };

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">{t("movies.overview.title")}</th>
          <th scope="col">{t("movies.overview.genre")}</th>
          <th scope="col">{t("movies.overview.duration")}</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie, index) => (
          <tr
            className="hover:bg-white"
            key={index}
            onClick={() => handleRowClick(movie)}
          >
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
