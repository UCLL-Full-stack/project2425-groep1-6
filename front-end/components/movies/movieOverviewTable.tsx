import React from "react";
import { Movie } from "@/types";
import { useTranslation } from "next-i18next";

type Props = {
  movies: Array<Movie> | null | undefined; // Toegestane types voor robustness
};

const MovieOverviewTable: React.FC<Props> = ({ movies }: Props) => {
  const { t } = useTranslation();

  if (!Array.isArray(movies) || movies.length === 0) {
    return <p>{t("movies.overview.nomovies")}</p>; // Fallback voor geen data
  }

  return (
    <div className="mb-8">
      {" "}
      {/* Add margin-bottom class here */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("movies.overview.title")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("movies.overview.genre")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("movies.overview.duration")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {movies.map((movie, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{movie.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{movie.genre}</td>
              <td className="px-6 py-4 whitespace-nowrap">
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
    </div>
  );
};

export default MovieOverviewTable;
