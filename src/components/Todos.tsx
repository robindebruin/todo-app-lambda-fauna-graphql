import React, { useEffect, useState, FC } from "react";
import axios from "axios";

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
  const [todos, setTodos] = useState<[any]>();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await (await fetch("/.netlify/functions/todos-read-all")).json();
    console.log(res);
    setTodos(res?.allTodos?.data);
  };

  return (
    <div>
      <h1>hoi</h1>
      <ul>
        {todos?.map((todo) => (
          <li key={todo?._id}>{todo?.title}</li>
        ))}
      </ul>
      <NewTodo />
    </div>
  );
}
