// import "./App.css";
import { ProductCard } from "./components";
import { ProductProps } from "./types/product";
import { useFetch } from "./hooks/useFetch";

function App() {
  const {
    data: products,
    error,
    loading,
  } = useFetch<ProductProps[]>("https://fakestoreapi.com/products");

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Ocurrio un error</p>;
  }

  return (
    <main className="max-w-[1110px] mx-auto">
      <section className="new-arrivals">
        <h2 className="uppercase font-extrabold text-center mb-[30px] text[38px]">
          New Arrivals
        </h2>
        <div className="list grid grid-cols-1 gap-4 items-end md:grid-cols-2 lg:grid-cols-4">
          {products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
