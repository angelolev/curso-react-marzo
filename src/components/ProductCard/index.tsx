import { ProductProps } from "../../types/product";

export default function ProductCard({ title, price, image }: ProductProps) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={image}
          alt="Imagen de producto"
          style={{ maxWidth: "120px" }}
        />
      </div>
      <div className="product-information">
        <h3>{title}</h3>
        <p>${price}</p>
      </div>
    </div>
  );
}
