import React from "react";
import { useParams } from "react-router-dom";
import Detail from "../components/Detail";

export default () => {
  let { id } = useParams();
  console.log(id);
  return (
    <div className="DetailMovie">
      <h1>DetailMovie</h1>
      {id && <Detail id={id} />}
    </div>
  );
};
