import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import NewTodo from "./NewTodo";
import { ALL_TODOS, DELETE_TODO } from "../graphql/graphql";

export default function Todos() {
  const { loading, error, data } = useQuery(ALL_TODOS);
  const [deleteTodo] = useMutation(DELETE_TODO, { refetchQueries: [{ query: ALL_TODOS }] });

  const handleDelete = (id: string) => {
    deleteTodo({ variables: { id } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>hoi</h1>
      <ul>
        {data.allTodos.data.map((todo: any) => (
          <li key={todo?._id}>
            {todo?.title} <button onClick={() => handleDelete(todo._id)}>x</button>
          </li>
        ))}
      </ul>
      <NewTodo />
    </div>
  );
}
