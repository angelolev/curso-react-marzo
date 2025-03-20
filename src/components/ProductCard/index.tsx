import { ProductProps } from "../../types/product";
// import "./index.css";

export default function ProductCard({ title, price, image }: ProductProps) {
  return (
    <div className="flex flex-wrap items-center flex-col">
      <div className="product-image">
        <img src={image} alt={title} className="max-w-[120px]" />
      </div>
      <div className="product-information">
        <h3 className="text-lg whitespace-nowrap overflow-hidden overflow-ellipsis w-[250px]">
          {title}
        </h3>
        <p className="font-bold text-[22px] bg-super-red">${price}</p>
      </div>
    </div>
  );
}
