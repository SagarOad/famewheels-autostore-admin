"use client";
import { Col, FormGroup, Label, Row, Input, Button } from "reactstrap";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { ButtonSection } from "../../dealer/add_dealer/ButtonSection";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Loading from "@/app/loading";
import CommonModal from "@/Components/UiKits/Modal/Common/CommonModal";
import { useAppSelector } from "@/Redux/Hooks";
import { useRouter } from "next/navigation";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const addcategory = () => {
  const token = localStorage.getItem("authToken");

  const router = useRouter();
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);

  const [submitting, setSubmitting] = useState(false);

  const [updateToken, setUpdateToken] = useState("");

  const [category, setCategory] = useState("");

  const [id, setId] = useState<number | any>(null);

  // for parsing data

  const getPostDetil = async () => {

    const formData = new FormData()

    formData.append("category_id",id)

    try {
      const response = await axios.post(`${BASE_URL}/show-product-categories`,formData, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

setCategory(response?.data?.category_name)

      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: carData,
    error: carError,
    isLoading: catLoading,
  } = useQuery(`getCategory${id}`, getPostDetil, {
    enabled: !!id, // Set enabled to false initially
  });

  const extractTokenFromUrl = (url: string, paramName: string) => {
    const urlSearchParams = new URLSearchParams(url);
    return urlSearchParams.get(paramName);
  };

  useEffect(() => {
    const url = window.location.search;
    const ID = extractTokenFromUrl(url, "id");
    setId(ID);
    // Call the function when the component mounts
  
  }, []);

  useEffect(() => {}, [carData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(`category_name`, `${category}`);

    
    if (id) {
      formData.append(`category_id`, `${id}`);
    }

    setSubmitting(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/${
          id ? "edit-product-categories" : "add-product-categories"
        }`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response?.data);
      router.push(`/${i18LangStatus}/categories/categorylist`);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {submitting || catLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <h1 className="faq-title">Basic Information</h1>
          <Row>
            <Col lg="12" md="6">
              <FormGroup>
                <Label>Category Name</Label>
                <Input
                  required
                  name="model"
                  type="text"
                  placeholder="Type category name"
                  className="form-control"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                ></Input>
              </FormGroup>
            </Col>
          </Row>

          <ButtonSection />
        </form>
      )}
    </>
  );
};

export default addcategory;
