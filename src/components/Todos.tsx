import React from "react";

export default function Todos() {
  const fetchTodosSql = async () => {
    // return (await fetch("http://localhost:9000/gettodosgql")).json();
    return (await fetch("/.netlify/functions/gettodosgql")).json();
  };

  const handleOnClick = () => {
    fetchTodosSql();
  };

  return (
    <div>
      hoi
      <button onClick={() => handleOnClick()}>fetch todos</button>
    </div>
  );
}
