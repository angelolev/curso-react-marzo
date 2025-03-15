import "./App.css";
import { ProductCard } from "./components";

const products = [
  {
    id: 0,
    name: "Producto 01",
    price: 240,
  },
  {
    id: 1,
    name: "Producto 02",
    price: 200,
  },
  {
    id: 2,
    name: "Producto 03",
    price: 140,
  },
  {
    id: 3,
    name: "Producto 04",
    price: 190,
  },
];

function App() {
  return (
    <main>
      <section className="new-arrivals">
        <h2>New Arrivals</h2>
        <div className="list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
