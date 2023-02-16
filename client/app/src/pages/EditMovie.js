import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_MOVIE } from "../components/Detail";
import { GET_MOVIES } from "./AllMovies";

const EDIT_MOVIE = gql`
  mutation EditMovie($MovieId: ID!, $editMovie: InputMovie) {
    updateMovie(_id: $MovieId, Movie: $editMovie) {
      message
    }
  }
`;
export default () => {
  const { id } = useParams();
  const { loading, error, data: Movie } = useQuery(GET_MOVIE, {
    variables: {
      MovieId: id,
    },
  });
  console.log(Movie);
  const [updateMovie, { data }] = useMutation(EDIT_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }],
  });
  useEffect(() => {
    Movie &&
      setDataMovie({
        title: Movie.Movie.title,
        overview: Movie.Movie.overview,
        poster_path: Movie.Movie.poster_path,
        popularity: Movie.Movie.popularity,
        tags: Movie.Movie.tags,
      });
  }, [Movie]);
  const [dataMovie, setDataMovie] = useState();
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newDataMovie = { ...dataMovie, [name]: value };
    setDataMovie(newDataMovie);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // sebelum dispatch perlu di validate dulu datanya
    updateMovie({
      variables: {
        MovieId: id,
        editMovie: { ...dataMovie, popularity: Number(dataMovie.popularity) },
      },
    });
  };
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>Error ...</p>;
  }
  console.log(dataMovie);
  return (
    <div className="EditMovie">
      <h1>EditMovie</h1>
      {dataMovie && (
        <form onSubmit={onSubmit}>
          Title
          <input
            type="text"
            value={dataMovie.title}
            name="title"
            onChange={onChange}
          />
          <br />
          <br />
          Overview
          <input
            type="text"
            value={dataMovie.overview}
            name="overview"
            onChange={onChange}
          />
          <br />
          <br />
          Poster_path
          <input
            type="text"
            value={dataMovie.poster_path}
            name="poster_path"
            onChange={onChange}
          />
          <br />
          <br />
          Popularity
          <input
            type="number"
            value={dataMovie.popularity}
            name="popularity"
            onChange={onChange}
          />
          <br />
          <br />
          Tags
          <input
            type="text"
            value={dataMovie.tags}
            name="tags"
            onChange={onChange}
          />
          <br />
          <br />
          <button className="btn btn-primary btn-sm" type="submit">
            Edit Movie
          </button>
        </form>
      )}
    </div>
  );
};
