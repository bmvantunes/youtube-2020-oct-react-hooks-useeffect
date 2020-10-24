import React, { useEffect, useState } from 'react';

export interface CounterProps {
  description: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export function Counter({ description }: CounterProps) {
  const [count, setCount] = useState(0);
  const [todo, setTodo] = useState<Todo>();

  useEffect(() => {
    async function loadData() {
      const resp = await fetch(
        'https://jsonplaceholder.typicode.com/todos/' + description
      );
      const json = await resp.json();
      setTodo(json);
    }
    loadData();
  }, [description]);

  return (
    <div>
      <h5>DESC: {description}</h5>
      {todo?.title}
      <button onClick={() => setCount(count - 1)}>-</button>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
