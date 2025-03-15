import { useState } from "react";
import "./App.css";

function App() {
  const [contador, setContador] = useState<number>(0);

  return (
    <>
      <p>Haz hecho click {contador} veces</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </>
  );
}

export default App;
