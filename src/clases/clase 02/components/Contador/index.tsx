import { useEffect, useState } from "react";

function Contador() {
  const [contador, setContador] = useState<number>(0);

  useEffect(() => {
    console.log("el componente ha cargado");
  }, []);

  useEffect(() => {
    console.log("el componente se ha actualizado");
    return () => {
      console.log("el componente se va a desmontar");
    };
  }, [contador]);

  return (
    <>
      <p>Haz hecho click {contador} veces</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </>
  );
}

export default Contador;
