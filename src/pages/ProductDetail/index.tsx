import { useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { ProductProps } from "../../types/product";
import { Layout } from "../../components";
import { useContext } from "react";
import { ShoppingCartContext } from "../../context";

export default function ProductDetailPage() {
  const { id } = useParams();
  const context = useContext(ShoppingCartContext);

  const {
    data: product,
    loading,
    error,
  } = useFetch<ProductProps>(`https://fakestoreapi.com/products/${id}`);

  const addToCart = (product: ProductProps) => {
    //logica de validacion
    context.setCartProducts([...context.cartProducts, product]);
  };

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return <p>Ocurrio un error</p>;
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="image">
          <img
            src={product?.image}
            alt={product?.title}
            className="max-w-[400px]"
          />
        </div>
        <div className="information">
          <h1 className="text-4xl font-bold mb-6">{product?.title}</h1>
          <p className="text-3xl font-bold mb-6">${product?.price}</p>
          <p className="text-gray-500">{product?.description}</p>
          <div className="my-6">
            <button
              className="bg-black text-white px-4 py-2 rounded-full cursor-pointer"
              onClick={() => product && addToCart(product)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
