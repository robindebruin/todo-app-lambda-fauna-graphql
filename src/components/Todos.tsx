import React, { useEffect, useState, FC } from "react";
import axios from "axios";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ALL_TODOS = gql`
  {
    allTodos {
      data {
        _id
        title
        completed
      }
    }
  }
`;

const NewTodo: FC = () => {
  const [todo, setTodo] = useState("");

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTodo(event.currentTarget.value);
  };

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: "/.netlify/functions/todos-update",
      data: JSON.stringify({ title: todo }),
    })
      .then()
      .catch((err) => alert(`update error: ${err}`));
  };

  return (
    <form onSubmit={handleClick}>
      <input value={todo} onChange={handleChange} />
      <button onClick={handleClick}>add todo</button>
    </form>
  );
};

export default function Todos() {
  const { loading, error, data } = useQuery(ALL_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>hoi</h1>
      <ul>
        {data.allTodos.data.map((todo: any) => (
          <li key={todo?._id}>{todo?.title}</li>
        ))}
      </ul>
      <NewTodo />
    </div>
  );
}
