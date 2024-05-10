import { useAppSelector } from "@/Redux/Hooks";
import { ProductDetailsProp } from "@/Types/EcommerceType";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";

export const ProductDetails :React.FC<ProductDetailsProp> = ({ item }) => {
  const { i18LangStatus } = useAppSelector((store) => store.langSlice);
  const { symbol } = useAppSelector((state) => state.product);

  return (
    <div className="product-details">
      <Rating fillColor="#ffa800" initialValue={Math.random() * 5} size={17} />
      <Link href={`/${i18LangStatus}/ecommerce/product_page`}>
        <h4>{item.product_title}</h4>
      </Link>
      <p dangerouslySetInnerHTML={{ __html: item.product_description}}></p>
      <div className="product-price">{symbol}{item.product_actual_price}
      <del className="f-w-700">{symbol}{item.product_discounted_price}</del>
      </div>
    </div>
  );
};
