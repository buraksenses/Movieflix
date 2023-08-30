import { WatchedMovie } from "./WatchedMovie";

export function WatchedMovieList({ watched, onDeleteWatched }) {
  let i = 0;
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          onDeleteWatched={onDeleteWatched}
          key={(i = i + 1)}
        />
      ))}
    </ul>
  );
}
