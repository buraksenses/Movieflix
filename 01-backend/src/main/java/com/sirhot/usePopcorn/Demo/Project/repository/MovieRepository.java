package com.sirhot.usePopcorn.Demo.Project.repository;

import com.sirhot.usePopcorn.Demo.Project.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie,String> {
}
