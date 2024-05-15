import { useState } from "react";
import { Button, Card, Row } from "reactstrap";
import ProductModal from "./ProductModal";
import { HoverButtons } from "./HoverButtons";
import { ProductDetails } from "./ProductDetails";
import { useAppSelector } from "@/Redux/Hooks";
import { getVisibleProducts } from "@/utils/Ecommerce.service";
import { ProductInterface, ProductItemInterface } from "@/Types/EcommerceType";
import Image from "next/image";
import { ImagePath } from "@/Constant";
import RatioImage from "@/CommonComponent/RatioImage";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const ProductGrid = () => {
  const router = useRouter();

  // const { productItem } = useAppSelector((state) => state.product);
  const token = localStorage.getItem("authToken");

  const { listView, colClass } = useAppSelector((state) => state.filterData);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataId, setDataId] = useState<undefined | number>();
  const [isDelete, setIsDelete] = useState<Boolean>(false);
  // const { filter } = useAppSelector((state) => state.filterData);
  // const products = getVisibleProducts(productItem, filter);

  const productList = async () => {
    const res = await axios.get(`${BASE_URL}/product-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  };

  const {
    data: products,
    error: brandError,
    isLoading,
  } = useQuery(`products_list_${isDelete}`, productList);

  const onClickHandle = (i: ProductInterface) => {
    setOpenModal(true);
    setDataId(i.product_id);
  };

  const handleDelete = async (item: any) => {
    const formData = new FormData();

    formData.append("product_id", item?.product_id);

    try {
      const response = await axios.post(
        `${BASE_URL}/delete-product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product Deleted Successfully");

      console.log(response?.data);
      if (response?.data) {
        setIsDelete(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item: any) => {
    router.push(`/en/products/addproducts?id=${item?.product_id}`);
  };

  return (
    <div className={`product-wrapper-grid ${listView ? "list-view" : ""}`}>
      <Row className="gridRow">
        {products &&
          products?.products.map((item: ProductInterface, index: number) => {
            return (
              <div
                id="gridId"
                className={`${colClass} ${listView ? "col-xl-12" : ""}`}
                key={index}
              >
                <Card>
                  <div className="product-box">
                    <div className="product-img bg-img-cover">
                      {/* {item.status !== "none" && (
                        <div className={`ribbon-index ${item.ribbonClassName}`}>
                          {item.status}
                        </div>
                      )} */}
                      <RatioImage
                        className="img-fluid"
                        src={`${products.imagepath}/${item?.product_token}/${item.product_cover}`}
                        alt=""
                      />
                      {/* <HoverButtons setDataId={setDataId} setOpenModal={setOpenModal} item={item} /> */}

                      <div className="product-hover">
                        <ul>
                          <li>
                            <Button
                              color="transparent"
                              className="border-0"
                              onClick={() => handleEdit(item)}
                            >
                              <i className="icofont icofont-ui-edit"></i>
                            </Button>
                          </li>
                          <li>
                            <Button
                              color="transparent"
                              className="border-0"
                              onClick={() => handleDelete(item)}
                            >
                              <i className="icon-trash"></i>{" "}
                            </Button>
                          </li>
                          <li>
                            <Button
                              color="transparent"
                              className="border-0"
                              onClick={() => onClickHandle(item)}
                            >
                              <i className="icon-eye"></i>
                            </Button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <ProductDetails item={item} />
                  </div>
                </Card>
              </div>
            );
          })}
        {openModal && (
          <ProductModal
            value={openModal}
            setOpenModal={setOpenModal}
            dataId={dataId}
          />
        )}
      </Row>
    </div>
  );
};
export default ProductGrid;
