import { Layout, CheckoutFormRHF } from "../../components";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../context";

interface FormData {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
}

export default function Cart() {
  const context = useContext(ShoppingCartContext);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  if (context.cartProducts.length === 0) {
    return (
      <Layout>
        <p>No hay productos en el carrito</p>
      </Layout>
    );
  }

  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleFormSubmit = (formData: FormData) => {
    context.setUserInfo(formData);
    context.setCheckoutComplete(true);
    // Here you would typically send the order to a backend
    alert("¡Pedido completado con éxito!");
  };

  if (context.checkoutComplete) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">¡Gracias por tu compra!</h2>
          <p>Tu pedido ha sido procesado correctamente.</p>
          <p className="mt-2">
            Te enviaremos un correo a {context.userInfo?.email} con los
            detalles.
          </p>
          <button
            className="mt-4 bg-black text-white px-4 py-2 rounded-full"
            onClick={() => {
              context.setCartProducts([]);
              context.setUserInfo(null);
              context.setCheckoutComplete(false);
            }}
          >
            Volver a la tienda
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold mb-4">Carrito de compras</h1>
        {context.cartProducts.map((item) => (
          <div className="flex gap-4 items-center" key={item.id}>
            <div>
              <img
                src={item.image}
                alt={item.title}
                className="max-w-[100px]"
              />
            </div>
            <div className="flex gap-2">
              <p>{item.title}</p>
              <p className="font-bold">${item.price}</p>
              <button
                className="text-red-500 cursor-pointer"
                onClick={() =>
                  context.setCartProducts(
                    context.cartProducts.filter(
                      (product) => product.id !== item.id
                    )
                  )
                }
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        <p className="font-bold flex justify-end">
          Total: $
          {context.cartProducts
            .reduce((acc, item) => acc + item.price, 0)
            .toFixed(2)}
        </p>

        {showCheckoutForm ? (
          <CheckoutFormRHF onSubmit={handleFormSubmit} />
        ) : (
          <div className="flex justify-end">
            <button
              className="bg-black text-white px-4 py-2 rounded-full cursor-pointer"
              onClick={handleCheckout}
            >
              Proceder al checkout
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
