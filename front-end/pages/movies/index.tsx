import Header from "@/components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Movie } from "@/types";
import MovieService from "@/services/movieService";
import MovieOverviewTable from "@/components/movies/movieOverviewTable";
import MovieForm from "@/components/movies/movieForm";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const { t } = useTranslation();

  const addMovie = async () => {
    const newMovie = {
      name: "New Movie",
      duration: new Date(0, 0, 0, 3, 30, 0),
      playingdates: [new Date("2024-06-27"), new Date("2024-08-01")],
      genre: "action",
      summary: "A brand new movie.",
    };
    const response = await MovieService.addMovie(newMovie);
    if (response.ok) {
      getMovies();
    } else {
      console.error("Failed to add movie");
    }
  };

  const getMovies = async () => {
    const token = sessionStorage.getItem("loggedInUserToken");
    const response = await MovieService.getAllMovies(token);
    const json = await response.json();
    setMovies(json);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>{t("movies.title")}</h1>
        <section>
          <h2>{t("movies.overviewtitle")}</h2>
          <MovieOverviewTable movies={movies} />
        </section>
        <section>
          <h2>{t("movies.addmovietitle")}</h2>
          <MovieForm />
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Movies;
