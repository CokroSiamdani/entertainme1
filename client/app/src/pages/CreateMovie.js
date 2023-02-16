import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {GET_MOVIES} from "./AllMovies"

const ADD_MOVIE = gql`
  mutation AddMovie($newMovie: InputMovie) {
    addMovie(Movie: $newMovie) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export default () => {
  const [addMovie, { data, loading, error }] = useMutation(ADD_MOVIE, {
    refetchQueries: [{query: GET_MOVIES}]
  });
  const [movieInput, setMovieInput] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: 0,
    tags: [""],
  });
  const onChange = (e) => {
    let { name, value } = e.target;
    const newInput = { ...movieInput, [name]: value };
    setMovieInput(newInput);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addMovie({
      variables: {
        newMovie: { ...movieInput, popularity: Number(movieInput.popularity) },
      },
    });
    setMovieInput({
      title: "",
      overview: "",
      poster_path: "",
      popularity: 0,
      tags: [""],
    });
  };
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>Error ...</p>;
  }
  return (
    <div className="CreateMovie">
      <h1>CreateMovie</h1>
      <form onSubmit={onSubmit}>
        Title
        <input
          type="text"
          value={movieInput.title}
          name="title"
          onChange={onChange}
        /><br /><br />
        Overview
        <input
          type="text"
          value={movieInput.overview}
          name="overview"
          onChange={onChange}
        /><br /><br />
        Poster_path
        <input
          type="text"
          value={movieInput.poster_path}
          name="poster_path"
          onChange={onChange}
        /><br /><br />
        Popularity
        <input
          type="number"
          value={movieInput.popularity}
          name="popularity"
          onChange={onChange}
        /><br /><br />
        Tags
        <input
          type="text"
          value={movieInput.tags}
          name="tags"
          onChange={onChange}
        /><br /><br />
        <button className="btn btn-primary btn-sm" type="submit">
          Add Movie
        </button>
      </form>
    </div>
  );
};
