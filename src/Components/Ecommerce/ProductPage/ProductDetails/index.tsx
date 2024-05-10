import { Card, CardBody, Col } from "reactstrap";
import { ProductTittle } from "@/Constant";
import { ProductColor } from "./ProductColor";
import { ProductDetailButton } from "./ProductDetailButton";
import { ProductRating } from "./ProductRating";
import { ProductSocial } from "./ProductSocial";
import { ProductTable } from "./ProductTable";
import { useAppSelector } from "@/Redux/Hooks";

const ProductDetails = ({product}:{product:any}) => {
const ProductDetail: string = "Rock Paper Scissors Various Dots Half Sleeves Girl’s Regular Fit T-Shirt I 100% Cotton T Shirt with Half Sleeve Round Neck I Regular Wear Solid Kids Tees and Black Sleeve.";
const { symbol } = useAppSelector((state) => state.product);

  return (
    <Col xxl="5" className="box-col-6 order-xxl-0 order-1">
      <Card>
        <CardBody>
          <div className="product-page-details">
            <h3 className="f-w-600">{product?.product_title}</h3>
          </div>
          <div className="product-price">
            {symbol}{product?.product_discounted_price}<del>{symbol}{product?.product_actual_price}</del>
          </div>
          <ProductColor />
          <p dangerouslySetInnerHTML={{__html:product?.product_description}}></p>
          <hr />
          <ProductTable product={product}/>
          <ProductSocial />
          <ProductRating />
          <ProductDetailButton />
        </CardBody>
      </Card>
    </Col>
  );
};
export default ProductDetails;
