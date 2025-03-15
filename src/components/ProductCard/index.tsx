import productImage from "../../assets/default-product-image.png";

interface ProductCardProps {
  name: string;
  price: number;
}

export default function ProductCard({ name, price }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={productImage} alt="Imagen de producto" />
      </div>
      <div className="product-information">
        <h3>{name}</h3>
        <p>${price}</p>
      </div>
    </div>
  );
}
