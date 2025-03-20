import "./App.css";
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
    <main>
      <section className="new-arrivals">
        <h2>New Arrivals</h2>
        <div className="list">
          {products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
