import React, { useEffect } from "react";
import { Card, Container, Row } from "reactstrap";
import ImageSlider from "./ImageSlider";
// import { useAppDispatch } from "@/Redux/Hooks";
// import { fetchProductApiData } from "@/Redux/Reducers/ProductSlice";
import ProductDetails from "./ProductDetails";
import BrandDetail from "./BrandDetail";
import ClothsDetails from "./ClothsDetails";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "@/app/loading";
// import Loading from "@/app/loading";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const ProductPageContainer = () => {
  const authToken = localStorage.getItem("authToken");

  const [token, setToken] = React.useState<string>("");

  const [id, setId] = React.useState<number | any>(null);

  const extractTokenFromUrl: any = (url: string, paramName: string) => {
    const urlSearchParams = new URLSearchParams(url);
    return urlSearchParams.get(paramName);
  };

  useEffect(() => {
    const url = window.location.search;
    const ID = extractTokenFromUrl(url, "id");
    setId(ID);
  }, [extractTokenFromUrl]);

  const productDetail = async () => {
    const formData = new FormData();

    formData.append("product_id", id);

    const res = await axios.post(`${BASE_URL}/product-detail`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    setToken(res?.data?.products?.product_token);

    return res?.data;
  };

  const {
    data: product,
    error: brandError,
    isLoading,
  } = useQuery(`single_products_${id}`, productDetail);

  const getPostImages = async () => {
    const formData = new FormData();

    formData.append("product_token", token);

    try {
      const response = await axios.post(
        `${BASE_URL}/product-images `,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: images,
    error: imgError,
    isLoading: imgLoading,
  } = useQuery(`single_products_images_${token}`, getPostImages, {
    enabled: !!token,
  });

  return (
    <Container fluid>
      {isLoading ? (
        <Loading />
        // <></>
      ) : (
        <div>
          <Row>
            <ImageSlider
              images={images}
              token={product?.products?.product_token}
            />
            <ProductDetails product={product?.products} />
            <BrandDetail />
          </Row>
          <Card>
            <Row className="product-page-main">
              <ClothsDetails product={product?.products} />
            </Row>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default ProductPageContainer;
