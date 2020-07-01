import React, { useEffect, useState } from "react";

const NewTodo = () => {
  const [todo, setTodo] = useState("");

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTodo(event.currentTarget.value);
  };

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(todo);
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
    const res = await (await fetch("/.netlify/functions/gettodos")).json();
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
