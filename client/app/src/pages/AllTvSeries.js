import React from "react";
import { gql, useQuery } from "@apollo/client";

export const GET_TVSERIES = gql`
  query {
    TvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export default () => {
  const { loading, error, data: TvSeries } = useQuery(GET_TVSERIES);
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>Error ...</p>;
  }
  console.log(TvSeries);
  return (
    <div>
      {/* {Movies.Movies && JSON.stringify(Movies.Movies)} */}
      <div className="container">
        <div className="row">
          {TvSeries.TvSeries &&
            TvSeries.TvSeries.map((TvSerie, id) => (
              <div className="product" key={id}>
                <div
                  className="card mx-1 my-2"
                  style={{ textAlign: "center", width: "270px" }}
                >
                  <img
                    className="card-img-top"
                    alt="Product Image"
                    src={TvSerie.poster_path}
                    height="300px"
                  />
                  <div className="card-body">
                    <h5 className="card-title m-1">{TvSerie.title}</h5>
                    <p className="card-text m-1">
                      Overview: {TvSerie.overview}
                    </p>
                    <p className="card-text m-1">
                      Popularity: {TvSerie.popularity}
                    </p>
                    <p className="card-text m-1">Tags: {TvSerie.tags}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
