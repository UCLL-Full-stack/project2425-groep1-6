import Header from "@/components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Movie } from "@/types";
import MovieService from "@/services/movieService";
import MovieOverviewTable from "@/components/movies/movieOverviewTable";
import MovieForm from "@/components/movies/movieForm";

const Movies: React.FC = () => {
  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Movies</h1>
        <section>
          <h2>Movies Overview</h2>
          <MovieOverviewTable />
        </section>
        <section>
          <h2>Add a Movie</h2>
          <MovieForm />
        </section>
      </main>
    </>
  );
};

export default Movies;
