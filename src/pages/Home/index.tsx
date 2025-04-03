import { ProductCard, Layout } from "../../components";
import { ProductProps } from "../../types/product";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { getCollection } from "../../firebase/firestore";

export default function Home() {
  const [productsFirebase, setProductsFirebase] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // setLoading(true);
        const data = await getCollection<ProductProps[]>("products");
        setProductsFirebase(data);
        // setError(null);
      } catch (err) {
        console.error("Error fetching todos:", err);
        // setError("Failed to load todos");
      } finally {
        // setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log(productsFirebase, "productos de firebase");

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
    <Layout>
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
    </Layout>
  );
}
