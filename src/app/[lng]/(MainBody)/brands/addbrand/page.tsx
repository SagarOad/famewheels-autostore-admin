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
  const [selectedMakeIds, setSelectedMakeIds] = useState<number[] |any[]>([]);
console.log(selectedMakeIds);

  const [brandId, setBrandId] = useState("");
  const [brandName, setBrandName] = useState("");

  const [makeId, setMakeId] = useState("");
  const [makeName, setMakeName] = useState("");
  const [makesData, setMakesData] = useState<any[]>([]);
  const [id,setId] = useState<number | any>()


  const extractTokenFromUrl = (url: string, paramName: string) => {
    const urlSearchParams = new URLSearchParams(url);
    return urlSearchParams.get(paramName);
  };

  useEffect(() => {
    const url = window.location.search;
    const ID:any = extractTokenFromUrl(url, "id");
    setId(ID);
    // Call the function when the component mounts
    if (!id) {
      return;
    }
  }, []);

console.log(id)

const brandDetail = async ()=>{
  const formData = new FormData()
  formData.append('brand_id',id)
  try {
    const response = await axios.post(`${BASE_URL}/show-brand`,formData,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

setBrandName(response?.data?.brand_name)

    const makes: any[] = JSON.parse(response?.data?.make_id);
    makes?.forEach((make: any) => {
      setSelectedMakeIds(prevIds => [...prevIds, parseInt(make)]);
    });
    
  } catch (error) {
    console.log(error)
  }
}


const {
  data: BrandData,
  error: brandDataError,
  isLoading: brandDataLoading,
} = useQuery(`Brand_Detail_${id}`, brandDetail,{
  enabled: !!id,
});


  const fetchBrands = async () => {
    const res = await axios.get(`${BASE_URL}/brand-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data[1]?.data;
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
     selectedMakeIds.map((makeId) =>
        formData.append("make_id[]", makeId)
      );


      await axios.post(`${BASE_URL}/add-brand`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Brand added successfully!");
      // Optionally redirect to another page
      // router.push(`/success-page`);
      router.push(`/en/brands/brandslist`);
    } catch (error) {
      console.error("Error adding brand:", error);
      toast.error("Failed to add brand");
    } finally {
      setSubmitting(false);
    }
  };
  

const handleEdit = async (e: FormEvent)=>{
e.preventDefault()

setSubmitting(true);

try {
  const formData = new FormData();
  formData.append("brand_id", id);
  formData.append("brand_name", brandName);

  // Construct an array of selected make IDs
 selectedMakeIds.map((makeId) =>
    formData.append("make_id[]", makeId)
  );


  await axios.post(`${BASE_URL}/edit-brand`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  toast.success("Brand Edited successfully!");
  // Optionally redirect to another page
  // router.push(`/success-page`);
  router.push(`/en/brands/brandslist`);

} catch (error) {
  console.error("Error Editing brand:", error);
  toast.error("Failed to Edit brand");
} finally {
  setSubmitting(false);
}

}

console.log(selectedMakeIds)

  return (
    <>
      {submitting ? (
        <Loading />
      ) : (
        <form onSubmit={ id ? handleEdit : handleSubmit}>
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
                  className="form-control"
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
  value={makesList?.filter((make: any) =>
    selectedMakeIds?.includes(make.makeId)
  ).map((make: any) => ({
    label: make.makeName,
    value: make.makeId,
  }))}
/>
              </FormGroup>
            </Col>
          </Row>

 { !id ? <ButtonSection /> : <div className="text-end"> <Button color="success">Edit</Button></div>}
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
