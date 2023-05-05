import { useState } from "react";
import useSWR from "swr";

export default function Joke() {
  const [id, setId] = useState(0);
  const { data, isLoading } = useSWR(
    `https://example-apis.vercel.app/api/bad-jokes/${id}`
  );

  const [funnyJokes, setFunnyJokes] = useState([0, 2, 4]);
  const funnyJoke = funnyJokes.includes(id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <small>ID: {id}</small>
      <h1>
        {data.joke} - {funnyJoke ? "funny" : "unfunny"}
      </h1>
      <button
        onClick={() => {
          if (funnyJoke) {
            setFunnyJokes(funnyJokes.filter((jokeId) => jokeId !== id));
          } else {
            setFunnyJokes([...funnyJokes, id]);
          }
        }}
      >
        is funny
      </button>
      <div>
        <button type="button" onClick={() => setId(data.prevId)}>
          ← Prev Joke
        </button>
        <button type="button" onClick={() => setId(data.nextId)}>
          Next Joke →
        </button>
      </div>
    </>
  );
}
