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
import Select from "react-select";
import { toast } from "react-toastify";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const addbrand = () => {
  const router = useRouter();
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);

  const [updateToken, setUpdateToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedMakeIds, setSelectedMakeIds] = useState<string[]>([]);

  const [brandId, setBrandId] = useState("");
  const [brandName, setBrandName] = useState("");

  const [makeId, setMakeId] = useState("");
  const [makeName, setMakeName] = useState("");
  const [makesData, setMakesData] = useState<any[]>([]);

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
    try {
      const res = await axios.get(`${BASE_URL}/byMake`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching makes:", error);
      throw error;
    }
  };

  const {
    data: makesList,
    error: makeError,
    isLoading: makeLoading,
  } = useQuery("myMakes", fetchMakes);

  const makesOptions = makesData.map((make) => ({
    label: make.makeName,
    value: make.makeId,
  }));

  useEffect(() => {}, [CartData]);

  const token = localStorage.getItem("authToken");

  const [successMessage, setSuccessMessage] = useState(""); // State to manage success message

  // Inside the handleSubmit function
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("brand_name", brandName);

      // Construct an array of selected make IDs
      const selectedMakeIdsArray = selectedMakeIds.map((makeId) =>
        makeId.toString()
      );

      // Append the array of selected make IDs once with the key 'make_ids[]'
      formData.append("make_id", JSON.stringify(selectedMakeIdsArray));

      await axios.post(`${BASE_URL}/add-brand`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Brand added successfully!");
      // Optionally redirect to another page
      // router.push(`/success-page`);
    } catch (error) {
      console.error("Error adding brand:", error);
      toast.error("Failed to add brand");
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
                  type="text"
                  placeholder="Select Brand"
                  className="form-control form-select"
                  onChange={(e: any) => setBrandName(e.target.value)}
                  value={brandName}
                >
                  {/* <option>Option 1</option>
                  <option>Option 1</option>
                  <option>Option 1</option> */}
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
                <Select
                  isMulti
                  options={makesList?.map((make: any) => ({
                    label: make.makeName,
                    value: make.makeId,
                  }))}
                  onChange={(selectedOptions: any) => {
                    const selectedMakeIds = selectedOptions.map(
                      (option: any) => option.value
                    );
                    setSelectedMakeIds(selectedMakeIds);
                  }}
                />
              </FormGroup>
            </Col>
          </Row>

          <ButtonSection />
          {/* {successMessage && (
            <div className="success-message">{successMessage}</div>
          )} */}
          {/* <ToastContainer /> */}
        </form>
      )}
    </>
  );
};

export default addbrand;
