import React, { useEffect, useState } from "react";

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
    </div>
  );
}
