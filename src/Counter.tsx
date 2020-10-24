import React, { useEffect, useState } from 'react';

export interface CounterProps {
  description: string;
}

export function Counter({ description }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      console.log('from cancel timeout', description);
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [description]);

  useEffect(() => {
    let currentRender = true;

    setTimeout(() => {
      if (currentRender) {
        console.log('from variable', description);
      } else {
        console.log('UPS I am done');
      }
    }, 3000);

    return () => {
      currentRender = false;
    };
  }, [description]);

  return (
    <div>
      <h5>DESC: {description}</h5>

      <button onClick={() => setCount(count - 1)}>-</button>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
