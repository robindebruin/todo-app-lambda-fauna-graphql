import React, { useEffect, useState, FC } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TODO, ALL_TODOS } from "../graphql/graphql";

const NewTodo: FC = () => {
  const [todo, setTodo] = useState("");
  const [addTodo] = useMutation(CREATE_TODO, { refetchQueries: [{ query: ALL_TODOS }] });

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTodo(event.currentTarget.value);
  };

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    addTodo({ variables: { title: todo, completed: false } });
    setTodo("");
  };

  return (
    <form onSubmit={handleClick}>
      <input value={todo} onChange={handleChange} />
      <button type="submit">add todo</button>
    </form>
  );
};

export default NewTodo;
