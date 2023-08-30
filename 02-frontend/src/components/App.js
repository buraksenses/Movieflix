import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { NavBar } from "./NavBar";
import { Logo } from "./Logo";
import { NumResults } from "./NumResults";
import { SearchBar } from "./SearchBar";
import { Main } from "./Main";
import { Box } from "./Box";
import { MovieList } from "./MovieList";
import { SelectedMovie } from "./SelectedMovie";
import { WatchedMovieList } from "./WatchedMovieList";
import { MovieSummary } from "./MovieSummary";
import { apiClient } from "./Service/MovieService";

export const KEY = "327eee59";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
    apiClient
      .delete(`/watchedMovies/${id}`)
      .catch((error) => console.error(error));
  }
  useEffect(function () {
    async function getMovies() {
      await apiClient.get("/watchedMovies").then((response) => {
        console.log(response.data);
        setWatched(response.data._embedded.watchedMovies);
      });
    }
    getMovies();
  }, []);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }

      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <div>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onClearMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <MovieSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
