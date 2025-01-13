import { createContext, useState } from "react";

export let CounterContext = createContext(0);

export default function CounterContextProvider(props) {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(10);

  return (
    <>
      <CounterContext.Provider value={{ counter1, counter2, setCounter1 }}>
        {props.children}
      </CounterContext.Provider>
    </>
  );
}
