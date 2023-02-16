import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIES_AND_TVSERIES = gql`
  query {
    Movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
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
  const { loading, error, data: AllData } = useQuery(GET_MOVIES_AND_TVSERIES);
  console.log(error);
  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Error ...</p>;
  }
  console.log(AllData);
  return (
    <div>
      {/* {JSON.stringify(AllData)} */}
      <div className="container">
        <div className="row">
          {AllData.Movies &&
            AllData.Movies.map((Data, id) => (
              <div className="product" key={id}>
                <div
                  className="card mx-1 my-2"
                  style={{ textAlign: "center", width: "270px" }}
                >
                  <img
                    className="card-img-top"
                    alt="Product Image"
                    src={Data.poster_path}
                    height="300px"
                  />
                  <div className="card-body">
                    <h5 className="card-title m-1">{Data.title}</h5>
                    <p className="card-text m-1">Overview: {Data.overview}</p>
                    <p className="card-text m-1">
                      Popularity: {Data.popularity}
                    </p>
                    <p className="card-text m-1">Tags: {Data.tags}</p>
                  </div>
                </div>
              </div>
            ))}
          {AllData.TvSeries &&
            AllData.TvSeries.map((Data, id) => (
              <div className="product" key={id}>
                <div
                  className="card mx-1 my-2"
                  style={{ textAlign: "center", width: "270px" }}
                >
                  <img
                    className="card-img-top"
                    alt="Product Image"
                    src={Data.poster_path}
                    height="300px"
                  />
                  <div className="card-body">
                    <h5 className="card-title m-1">{Data.title}</h5>
                    <p className="card-text m-1">Overview: {Data.overview}</p>
                    <p className="card-text m-1">
                      Popularity: {Data.popularity}
                    </p>
                    <p className="card-text m-1">Tags: {Data.tags}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
