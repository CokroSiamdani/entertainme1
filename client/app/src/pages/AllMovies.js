import React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

export const GET_MOVIES = gql`
  query {
    Movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const DELETE_MOVIE = gql`
  mutation DeleteMovie($MovieId: ID!) {
    deleteMovie(_id: $MovieId) {
      message
    }
  }
`;

export default () => {
  const { loading, error, data: Movies } = useQuery(GET_MOVIES);
  const [deleteMovie, { data }] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }],
  });

  const onDelete = (id) => {
    deleteMovie({
      variables: {
        MovieId: id,
      },
    });
  };

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Error ...</p>;
  }
  console.log(Movies);
  return (
    <div>
      {/* {Movies.Movies && JSON.stringify(Movies.Movies)} */}
      <div className="container">
        <div className="row">
          {Movies.Movies &&
            Movies.Movies.map((Movie, id) => (
              <div className="product" key={id}>
                <div
                  className="card mx-1 my-2"
                  style={{ textAlign: "center", width: "270px" }}
                >
                  <img
                    className="card-img-top"
                    alt="Product Image"
                    src={Movie.poster_path}
                    height="300px"
                  />
                  <div className="card-body">
                    <h5 className="card-title m-1">{Movie.title}</h5>
                    <p className="card-text m-1">Overview: {Movie.overview}</p>
                    <p className="card-text m-1">
                      Popularity: {Movie.popularity}
                    </p>
                    <p className="card-text m-1">Tags: {Movie.tags}</p>
                    <div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onDelete(Movie._id)}
                      >
                        Delete
                      </button>
                      ||
                      <Link
                        className="btn btn-primary btn-sm"
                        to={`/detail-movie/${Movie._id}`}
                      >
                        Detail
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
