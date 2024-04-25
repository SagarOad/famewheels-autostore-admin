"use client";
import { Col, FormGroup, Label, Row, Input, Button } from "reactstrap";

import { useQuery } from "react-query";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { ButtonSection } from "../../dealer/add_dealer/ButtonSection";
import { v4 as uuidv4 } from "uuid";
import Loading from "@/app/loading";
import { useAppSelector } from "@/Redux/Hooks";
import { useRouter } from "next/navigation";
import { CartData } from "@/Layout/Header/CartData";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const addbrand = () => {
  const router = useRouter();
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);

  const [updateToken, setUpdateToken] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [brandId, setBrandId] = useState("");
  const [brandName, setBrandName] = useState("");

  const [makeId, setMakeId] = useState("");
  const [makeName, setMakeName] = useState("");

  const fetchBrands = async () => {
    const res = await axios.get(`${BASE_URL}/brand-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data[1];
  };

  const {
    data: BrandList,
    error: brandError,
    isLoading: brandLoading,
  } = useQuery("myBrands", fetchBrands);

  const fetchMakes = async () => {
    const res = await axios.get(`${BASE_URL}/byMake`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const {
    data: MakesList,
    error: makeError,
    isLoading: makeLoading,
  } = useQuery("myMakes", fetchMakes);

  useEffect(() => {}, [CartData]);

  const token = localStorage.getItem("authToken");

  const [successMessage, setSuccessMessage] = useState(""); // State to manage success message

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("brand_name", brandName);
      formData.append("make_id", makeId);

      await axios.post(`${BASE_URL}/add-brand`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Brand added successfully!");
    } catch (error) {
      console.error("Error adding brand:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {submitting ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <h1 className="faq-title">Basic Information</h1>
          <Row>
            <Col lg="12" md="6">
              <FormGroup>
                <Label>Brand Name</Label>
                <Input
                  required
                  name="brand"
                  type="select"
                  placeholder="Select Brand"
                  className="form-control form-select"
                  onChange={(e: any) => setBrandName(e.target.value)}
                  value={brandName}
                >
                  <option value="" disabled>
                    Select Brand
                  </option>
                  {BrandList?.map((brand: any) => (
                    <option key={brand?.brand_id} value={brand?.brand_id}>
                      {brand.brand_name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col lg="6" md="6">
              <FormGroup>
                <Label>Make Name</Label>
                <Input
                  required
                  name="make"
                  type="select"
                  placeholder="Select Make"
                  className="form-control form-select"
                  onChange={(e: any) => setMakeId(e.target.value)}
                  value={makeId}
                >
                  <option value="" disabled>
                    Select Make
                  </option>
                  {MakesList?.map((make: any) => (
                    <option key={make?.makeId} value={make.makeId}>
                      {make.makeName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <ButtonSection />
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </form>
      )}
    </>
  );
};

export default addbrand;
