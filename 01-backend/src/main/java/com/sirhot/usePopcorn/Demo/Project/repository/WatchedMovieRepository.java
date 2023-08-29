package com.sirhot.usePopcorn.Demo.Project.repository;

import com.sirhot.usePopcorn.Demo.Project.entity.WatchedMovie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchedMovieRepository extends JpaRepository<WatchedMovie,String> {
}
