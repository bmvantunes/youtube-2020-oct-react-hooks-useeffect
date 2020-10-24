import React, { useState } from 'react';

export interface CounterProps {
  description: string;
}

export function Counter({ description }: CounterProps) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h5>
        DESC: {description}
      </h5>

      <button onClick={() => setCount(count - 1)}>-</button>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
