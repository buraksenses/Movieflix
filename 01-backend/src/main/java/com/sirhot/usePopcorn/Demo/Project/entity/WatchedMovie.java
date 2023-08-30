package com.sirhot.usePopcorn.Demo.Project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "watched_movie")
@Data
public class WatchedMovie {

    @Id
    @Column(name = "imdb_id")
    private String imdbId;

    @Column(name = "title")
    private String title;

    @Column(name = "year")
    private int year;

    @Column(name = "poster")
    private String poster;

    @Column(name = "runtime")
    private int runtime;

    @Column(name = "imdb_rating")
    private double imdbRating;

    @Column(name = "user_rating")
    private double userRating;
}
