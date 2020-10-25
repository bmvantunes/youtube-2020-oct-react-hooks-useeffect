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
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // If you find this example too complex and want a video
  // explaining it, please, do let me know and I'll record a video
  // explaining it, step-by-step =)
  useEffect(() => {
    let currentRender = true;

    // we can also abort http calls,
    // I am adding it here as well...
    // https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
    // If you look into the developer tools (network tab), 
    // we are also cancelling the ongoing/pending requests
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setErrorMessage('');

    async function loadData() {
      try {
        const resp = await fetch(
          // _delay=5000, means we are asking for a delay of 5 seconds on each response
          // to make sure our browser is not caching any request
          // we are adding a _bustcache parameter with the current date,
          // so we always have a new request - no cache - obviously this is for demo purposes only :)
          // In a real application we would love to have cache =)
          `https://jsonplaceholder.typicode.com/todos/${description}?_delay=5000&_bustcache=${new Date()}`,
          {
            signal, // this is the signal from the AbortController.signal
          }
        );

        if (!resp.ok && currentRender) {
          // fetch even on 400/500 status code(s), doesn't throw error/exception,
          // so if we want to go to the catch block, we need to
          // throw the Error ourselves here, or...do some if/else logic, which looks ugly =D
          // so I'm deciding to throw the error here =)
          throw new Error(`Sadly, we received a ${resp.status} status code`);
        }

        const json = await resp.json();

        if (currentRender) {
          setTodo(json);
          setLoading(false);
          setErrorMessage('');
        }
      } catch (err) {
        if (currentRender) {
          console.log('error message: ', err.message);
          setLoading(false);
          setErrorMessage(err.message);
        }
      }
    }

    loadData();

    return () => {
      currentRender = false;
      controller.abort(); // here we are aborting the call
    };
  }, [description]);

  return (
    <div>
      <h5>DESC: {description}</h5>
      <pre>{JSON.stringify({ loading, error: errorMessage })}</pre>

      <div>{todo?.title}</div>
      <div>{todo?.id}</div>
      <div>{todo?.userId}</div>

      <button onClick={() => setCount(count - 1)}>-</button>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
