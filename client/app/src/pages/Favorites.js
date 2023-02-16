import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_FAVORITES = gql`
  query {
    favorites @client
  }
`;

export default () => {
  const { loading, error, data } = useQuery(GET_FAVORITES);
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>Error ...</p>;
  }
  console.log(data)
  return (
    <div>
      {/* {JSON.stringify(data)} */}
      <div className="container">
        <div className="row">
          {data.favorites &&
            data.favorites.map((favorite, id) => (
              <div className="product" key={id}>
                <div
                  className="card mx-1 my-2"
                  style={{ textAlign: "center", width: "270px" }}
                >
                  <img
                    className="card-img-top"
                    alt="Product Image"
                    src={favorite.poster_path}
                    height="300px"
                  />
                  <div className="card-body">
                    <h5 className="card-title m-1">{favorite.title}</h5>
                    <p className="card-text m-1">Overview: {favorite.overview}</p>
                    <p className="card-text m-1">
                      Popularity: {favorite.popularity}
                    </p>
                    <p className="card-text m-1">Tags: {favorite.tags}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
