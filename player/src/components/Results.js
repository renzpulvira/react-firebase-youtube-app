import React, { useEffect, useState } from "react";
import ResultsList from "./ResultsList";

export default function Results({ search }) {
  const [counter, setCounter] = useState([]);

  useEffect(() => {
    console.warn("Updated props");
    setCounter(search);
  }, [search]);

  return (
    <ul>
      {counter.map((res_id, res_res) => (
        <ResultsList key={res_id} results={res_res} />
      ))}
    </ul>
  );
}
