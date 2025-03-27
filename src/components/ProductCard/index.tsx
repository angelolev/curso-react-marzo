import { Link } from "react-router";
import { ProductProps } from "../../types/product";
// import "./index.css";

export default function ProductCard({ title, price, image, id }: ProductProps) {
  return (
    <div className="flex flex-wrap items-center flex-col">
      <div className="product-image">
        <img src={image} alt={title} className="max-w-[120px]" />
      </div>
      <div className="product-information">
        <Link
          to={`/product/${id}`}
          className="inline-block text-lg whitespace-nowrap overflow-hidden overflow-ellipsis w-[220px]"
        >
          {title}
        </Link>
        <p className="font-bold text-[22px]">${price}</p>
      </div>
    </div>
  );
}
