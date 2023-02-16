import React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { favorites } from "../config/graphql";

export const GET_MOVIE = gql`
  query findMovieById($MovieId: ID!) {
    Movie(_id: $MovieId) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export default ({ id }) => {
  console.log(id);
  const { loading, error, data: Movie } = useQuery(GET_MOVIE, {
    variables: {
      MovieId: id,
    },
  });
  function addToFavorites(data) {
    console.log("MASUK ADD TO FAVORITES", data);
    const oldFavorites = favorites()
    console.log(oldFavorites)
    const newFavorite = [...oldFavorites, data]
    favorites(newFavorite);
  }
  console.log(error);
  if (loading) {
    return <p>Loading ....</p>;
  }
  if (error) {
    return <p>error ....</p>;
  }
  console.log(Movie.Movie);
  return (
    <div className="Detail">
      {/* {Movie && JSON.stringify(Movie)} */}
      <div className="container">
        <div className="Detail">
          <div className="product">
            <div
              className="card"
              style={{
                textAlign: "center",
                width: "350px",
                marginLeft: "375px",
              }}
            >
              <img
                className="card-img-top"
                alt="Product Image"
                src={Movie.Movie.poster_path}
                height="350px"
              />
              <div className="card-body">
                <h5 className="card-title m-1">{Movie.Movie.title}</h5>
                <p className="card-text m-1">
                  Overview: {Movie.Movie.overview}
                </p>
                <p className="card-text m-1">
                  Popularity: {Movie.Movie.popularity}
                </p>
                <p className="card-text m-1">Tags: {Movie.Movie.tags}</p>
                <div>
                  <Link className="btn btn-primary btn-sm" to={`/`}>
                    Back
                  </Link>
                  ||
                  <Link
                    className="btn btn-primary btn-sm"
                    to={`/edit-movie/${Movie.Movie._id}`}
                  >
                    Edit
                  </Link>
                  ||
                  <button
                    href=""
                    className="btn btn-primary btn-sm"
                    onClick={() => addToFavorites(Movie.Movie)}
                  >
                    Add to favorite
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
