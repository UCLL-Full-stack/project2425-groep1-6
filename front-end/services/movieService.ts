
const getAllMovies = async (token: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const getMovieById = async (movieId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/${movieId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
  };
  

  const addMovie = async (movie: { name: string; duration: Date; playingdates: Date[]; genre: string; summary: string; }) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(movie)
    });
  };


  
  const MovieService = {
    getAllMovies,
    getMovieById,
    addMovie
  };
  
  export default MovieService;
  