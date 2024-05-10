import { ImagePath } from "@/Constant";
import { useAppSelector } from "@/Redux/Hooks";
import { ProductItemInterface, ProductModalInterfaceType } from "@/Types/EcommerceType";
import { useEffect, useState } from "react";
import { Button, Col, Modal, ModalHeader, Row } from "reactstrap";
import { ModalButtons } from "./ModalButtons";
import { ModalProductDetails } from "./ModalProductDetails";
import { ModalQuantity } from "./ModalQuantity";
import { useQuery } from "react-query";
import axios from "axios";
import Link from "next/link";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const ProductModal :React.FC<ProductModalInterfaceType> = ({ value, setOpenModal, dataId }) => {

  const token = localStorage.getItem("authToken");

  const [open, setOpen] = useState(value);
  // const { productItem } = useAppSelector((state) => state.product);
  const [quantity, setQuantity] = useState<number>(1);
  const [singleProduct, setSingleProduct] = useState<ProductItemInterface | undefined | [] | any>([]);

  // useEffect(() => {
  //   productItem.forEach((product: ProductItemInterface) => {
  //     if (product.id === dataId) setSingleProduct(product);
  //   });
  // }, [productItem, dataId]);


  const productDetail = async () => {
    
const formData = new FormData()

formData.append("product_id",dataId)

    const res = await axios.post(`${BASE_URL}/product-detail`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  };

  const {
    data: product,
    error: brandError,
    isLoading,
  } = useQuery(`single_products`, productDetail);


  const onCloseModal = () => {
    setOpen(false);
    setOpenModal(false);
  };

  return (
    <Modal centered size="lg" className="product-box" isOpen={open} toggle={onCloseModal}>
      <ModalHeader>
        <Button close onClick={onCloseModal}></Button>
        <Row className="product-box">
          <Col lg="6" className="product-img">
            <img className="img-fluid" src={`${product?.imagepath}/${product?.products.product_token}/${product?.products?.product_cover}`} alt="product-image" />
          </Col>
          <Col lg="6" className="product-details text-start p-1">
            <ModalProductDetails singleProduct={product?.products} />
            <div className="product-qnty w-100">
              <ModalQuantity quantity={quantity} setQuantity={setQuantity} />
              {/* <ModalButtons singleProduct={product} quantity={quantity} /> */}

<Link href={`/en/products/product_page?id=${product?.products.product_id}`}><Button color="primary" >View Details</Button></Link>

            </div>
          </Col>
        </Row>
      </ModalHeader>
    </Modal>
  );
};
export default ProductModal;
