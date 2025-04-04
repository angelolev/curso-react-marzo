import { ProductCard, Layout } from "../../components";
import { ProductProps } from "../../types/product";
import { use, Suspense, Component, ErrorInfo, ReactNode } from "react";

// Create a function that returns a promise with the product data
function fetchProducts() {
  return fetch("https://fakestoreapi.com/products").then((response) => {
    if (!response.ok) {
      throw new Error("Fallo la API");
    }
    return response.json();
  });
}

// Create and cache the promise
const productsPromise = fetchProducts();

// Error boundary component to handle errors in the use hook
class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error in component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Component that uses the use hook to fetch products
function ProductList() {
  const products = use<ProductProps[]>(productsPromise);

  return (
    <div className="list grid grid-cols-1 gap-4 items-end md:grid-cols-2 lg:grid-cols-4">
      {products?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      <section className="new-arrivals">
        <h2 className="uppercase font-extrabold text-center mb-[30px] text[38px]">
          New Arrivals
        </h2>
        <ErrorBoundary fallback={<p>Ocurrio un error</p>}>
          <Suspense fallback={<p>Cargando productos...</p>}>
            <ProductList />
          </Suspense>
        </ErrorBoundary>
      </section>
    </Layout>
  );
}
