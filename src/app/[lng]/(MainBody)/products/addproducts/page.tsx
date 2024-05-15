"use client";
import { Col, FormGroup, Label, Row, Input, Button } from "reactstrap";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import {
  AdjustableHeadlights,
  AirConditioner,
  AlloyWheels,
  AndroidAuto,
  AntiLockBrakingSystemABS,
  AntiTheftAlarmSystem,
  AppleCarPlay,
  ArmRest,
  AutoBrakeHold,
  AutoParkingSystem,
  AutoRetractableSideMirrors,
  AutomaticHeadLamps,
  AutonomousEmergencyBrakingAEB,
  BlindSpotDetectionBSD,
  BodyType,
  BootSpaceL,
  BossSeatSwitch,
  CDPlayer,
  CentralLocking,
  ClimateControl,
  Color,
  CoolBox,
  CoverImage,
  CruiseControl,
  drls,
  DVDPlayer,
  Description,
  Displacement,
  DisplaySizeinch,
  DoorOpeningWarning,
  DownHillAssistControl,
  DriverSeatBeltWarning,
  DriverSeatElectricAdjustment,
  DriverSeatLumbarSupport,
  DriverSeatMemoryFunction,
  DrivingModes,
  DualExhaust,
  EXFactoryPrice,
  ElectronicBrakeForceDistributionEBD,
  EngineType,
  FogLights,
  FrontBrakes,
  FrontCamera,
  FrontParkingSensors,
  FrontPowerOutlet,
  FrontSpeakers,
  FrontSuspension,
  FuelSystem,
  FuelTankCapacityL,
  Gearboxspeed,
  GroundClearenceMM,
  Handbrake,
  HeadlightOnReminder,
  HeatedSeats,
  Heater,
  HillStartAssistControl,
  HorsePower,
  Immobilizer,
  InformationCluster,
  KerbWeightKG,
  KeyType,
  KeylessEntry,
  LaneKeepAssistSystemLKAS,
  LaunchDate,
  Make,
  MaxSpeedKMH,
  MileageCityKML,
  MileageHighwayKML,
  Model,
  MultiInfo,
  Navigation,
  NoOfAirbags,
  NoOfCylinders,
  NoOfDoors,
  NoOfSeatbelts,
  NoOfSpeakers,
  OverallLengthMM,
  OverallWidthMM,
  PaddleShifter,
  Panaromic,
  PassengerSeatBeltWarning,
  PassengerSeatElectricAdjustment,
  PowerAssisted,
  PowerDoorLocks,
  PowerMirrors,
  PowerWindows,
  PushStart,
  RainSensingWipers,
  RearACVents,
  RearBrakes,
  RearCamera,
  RearFoldingSeat,
  RearHeadrest,
  RearParkingSensors,
  RearPowerOutlet,
  RearSeatEntertainment,
  RearSpeakers,
  RearSpoiler,
  RearSuspension,
  RearWiper,
  RemoteEngineStart,
  RoofRails,
  SeatMaterialType,
  SeatingCapacity,
  SideMirrorswithIndicators,
  SideSteps,
  SpareTyre,
  SpareTyreSizeInch,
  SpeedSensingAutoDoorLock,
  SteeringAdjustment,
  SteeringSwitches,
  SteeringType,
  SunRoof,
  Tachometer,
  TractionControl,
  TransmissionType,
  TurboCharger,
  TyrePressureMonitoringSystemTPMS,
  TyreSize,
  USBandAuxillaryCable,
  ValvesPerCylinder,
  Varient,
  VehicleStabilityControl,
  VoiceControl,
  WheelBaseMM,
  WheelSizeInch,
  WheelType,
  WirelessCharger,
  Year,
} from "@/Constant";
import { useQuery } from "react-query";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ButtonSection } from "../../dealer/add_dealer/ButtonSection";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Loading from "@/app/loading";
import CommonModal from "@/Components/UiKits/Modal/Common/CommonModal";
import { useAppSelector } from "@/Redux/Hooks";
import { useRouter } from "next/navigation";
import Editor from "@/Components/Miscellaneous/Editors/Editor";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

interface ImageData {
  id: string; // Adjust the type based on your actual data structure
  image_name: string; // Adjust the type based on your actual data structure
  // Add other properties as needed
}

const addproducts = () => {

  const extractTokenFromUrl = (url: string, paramName: string) => {
    const urlSearchParams = new URLSearchParams(url);
    return urlSearchParams.get(paramName);
  };

  const router = useRouter();
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);

  const [submitting, setSubmitting] = useState(false);

  const [updateToken, setUpdateToken] = useState("");

  const [postToken, setPostToken] = useState("");
  const [imagePath, setImagePath] = useState("");

  const [coverImage, setCoverImage] = useState("");
  const [title, setTitle] = useState("");

  const [price, setPrice] = useState<number | any>();
  const [discountedPrice, setDiscountedPrice] = useState<number | any>();
  const [description, setDescription] = useState("");
  const [prevImg, setPrevImg] = useState<any>("");

  // features
  const [imageApi, setImageApi] = useState(true);

  
  const [getUpdate, setGetUpdate] = useState(false);

  const [imagesPath, setImagesPath] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [files, setFiles] = useState<any[]>([]);
  const [moreImages, setMoreImages] = useState<any[]>([]);
  const [id, setId] = useState<string | any>(null);
  const [brand, setBrand] = useState<string | any>(null);
  const [category, setCategory] = useState<string | any>(null);

  // for parsing data

  const generateToken = () => {
    const newToken = uuidv4().replace(/-/g, "").slice(0, 12);
    setPostToken(newToken);
  };

  const getPostDetil = async () => {
    
    try {
      const formData = new FormData();

    formData.append("product_id", id);

    const response = await axios.post(`${BASE_URL}/product-detail`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      setDescription(response?.data?.products?.product_description);
      setTitle(response?.data?.products?.product_title)
      setPrice(response?.data?.products?.product_actual_price)
      setDiscountedPrice(response?.data?.products?.product_discounted_price)
      setBrand(response?.data?.products?.brand_id)
      setCategory(response?.data?.products?.product_category_id)
      setCoverImage(response?.data?.products?.product_cover)
      setImagePath(`${response?.data?.imagepath}/${response?.data?.products?.product_token}/`)

      setUpdateToken(response?.data?.products?.product_token);
    
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: productData,
    error: carError,
    isLoading: carLoading,
  } = useQuery(`getProductData${id}`, getPostDetil, {
    enabled: !!id, // Set enabled to false initially
  });



  useEffect(() => {
    const url = window.location.search;
    const ID = extractTokenFromUrl(url, "id");
    setId(ID);
    // Call the function when the component mounts
    if (!id) {
      generateToken();
    }
  }, []);

  const fetchBrandList = async () => {
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
    isLoading,
  } = useQuery(`brandsListinaddproduct`, fetchBrandList);

  console.log(prevImg)

  const fetchCategoryList = async () => {
    const res = await axios.get(`${BASE_URL}/product-categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data[1];
    };

  const {
    data: CategoryList,
    error: categoryError,
    isLoading:categoryLoading,
  } = useQuery(`categoryListinaddproduct`, fetchCategoryList);
  
  const updateFiles = async (incomingFiles: any) => {
    setFiles(incomingFiles);
    setMoreImages(incomingFiles);
    try {
      const formData: any = new FormData();
      // formData.append("imagesList", null);
      formData.append(`product_token`, updateToken ? updateToken : postToken);

      files.forEach((image: any) => {
        formData.append(`file[]`, image.file);
      });

      if (incomingFiles?.length > 0) {
        incomingFiles.forEach((image: any) => {
          formData.append(`file[]`, image.file);
        });
      }

      const response = await axios.post(`${BASE_URL}/save-product-images`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setNewFiles(response?.data?.product_images);

      setImageApi(true);
    } catch (error) {
      console.error("image upload Error:", error);
    }
  };

  const removeFile = async (name: any, index: number) => {
    // setFiles(files.filter((x: ExtFile) => x.id !== id));

    files.splice(index, 1);

    setFiles([...files]);

    moreImages.splice(index, 1);
    setMoreImages([...moreImages]);

    newFiles.splice(index, 1);
    setNewFiles([...newFiles]);

    uploadedImages.splice(index, 1);
    setUploadedImages([...uploadedImages]);

    // try {
    //   const response = await axios.get(`${BASE_URL}/deleteImages`, {
    //     params: {
    //       post_id: updateToken ? updateToken : postToken,
    //       filename: name,
    //     },
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   setGetUpdate(!getUpdate);
    //   setFiles(files.splice(0, index));
    // } catch (error) {
    //   console.error("image delete Error:", error);
    // }
  };


  const getProductImages = async () => {
    const formData = new FormData();

    formData.append("product_token", updateToken);

    try {
      const response = await axios.post(
        `${BASE_URL}/product-images `,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUploadedImages(response?.data?.product_images);
      setMoreImages(response?.data?.product_images);
      setNewFiles(response?.data?.product_images);


      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: images,
    error: imagesError,
    isLoading: imagesLoading,
  } = useQuery(`single_products_images_${updateToken}`, getProductImages, {
    enabled: !!updateToken,
  });






  const token = localStorage.getItem("authToken");

  console.log("newFiles === >>. ",newFiles)

  const coverChange = async (e: any) => {

    const file = e.target.files[0];

    try {
      const formData: any = new FormData();
      // formData.append("imagesList", null);
      formData.append(`product_token`, updateToken ? updateToken : postToken);

        formData.append(`file[]`, file);
    

   

      const response = await axios.post(`${BASE_URL}/save-product-images`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response?.data?.product_images[0])

      setCoverImage(response?.data?.product_images[0]);


      setPrevImg(`${response?.data?.imagepath}/${response?.data?.product_images[0]}`)
  
    } catch (error) {
  console.log(error)
}

    const reader = new FileReader();

    reader.onload = () => {
      const imageSrc = reader.result;
      setPrevImg(imageSrc);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (files?.length !== 0 || uploadedImages?.length !== 0) {
      

      formData.append(`product_title`, title);
      formData.append(`product_token`, postToken);
      formData.append(`product_description`, description);
      formData.append(`product_cover`, coverImage);
      formData.append(`product_actual_price`, price);
      formData.append(`product_discounted_price`, discountedPrice);
      formData.append(`brand_id`, brand);
      formData.append(`product_category_id`, category);
      if (id) {
        formData.append(`product_id`, `${id}`);
        formData.append(`product_token`, `${updateToken}`);
      }

      if (uploadedImages?.length !== 0) {
        moreImages.forEach((image: any) => {
          formData.append(`product_images[]`, image.filename);
        });
      }

      if (files.length !== 0) {
        newFiles.forEach((image: any) => {
          formData.append(`product_images[]`, image);
        });
      }

      setSubmitting(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/${
            updateToken ? "edit-product" : "add-product"
          }`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success(response?.data?.message);
        router.push(`/${i18LangStatus}/products/all-products`);
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    } else {
      toast.error("Images Required");
    }
  };

  const [centred, setCentered] = useState(false);

  const centeredToggle = () => {
    return setCentered(!centred);
  };

  const handleEditorDataChange = (data: string) => {
    setDescription(data);
  };

  console.log(`${imagePath}/${coverImage}`)

  return (
    <>
      {submitting ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <h1 className="faq-title">Create Product</h1>

          <Row>
            <Col>
              <FormGroup>
                <Label check>Product Images</Label>
                <Dropzone
                  onChange={updateFiles}
                  required
                  accept="image/*"
                  value={files}
                  maxFiles={20}
                  header={false}
                  footer={false}
                  minHeight="80px"
                  label="Drag'n drop files here or click to Browse"
                >
                  {files?.length === 0 && (
                    <div className="dz-message needsclick">
                      <i className="icon-cloud-up fs-1 txt-primary"></i>
                      <h6 className="f-w-700 mb-1">
                        Drop images here or click to upload.
                      </h6>
                      <h6 className="note needsclick">
                        (This is a dropzone. Selected )
                      </h6>
                    </div>
                  )}

                  {files?.map((file: ImageData, ind) => {
                    return (
                      <FileMosaic
                        key={ind}
                        {...file}
                        onDelete={() => removeFile(file, ind)}
                        preview
                      />
                    );
                  })}
                </Dropzone>

                {uploadedImages?.length !== 0 && (
                  <h4 className="faq-title">Previous Images</h4>
                )}

                <div className="d-flex flex-wrap w-100 justify-content-center gap-2 border-1 mt-4 align-items-center ">
                  {uploadedImages?.map((file: ImageData, ind) => {
                    return (
                      // <FileMosaic key={file.id} {...file} onDelete={removeFile} preview/>
                      <div className=" position-relative d-flex w-25" key={ind}>
                        <img
                          src={`${imagePath || postToken}/${
                            file?.image_name
                          }`}
                          className="img-fluid object-fit-contain rounded-4 "
                          alt={file.image_name}
                        />
                        <i
                          className="icofont icofont-close-circled rounded-pill bg-primary fs-6 position-absolute top-0 z-3 m-1"
                          style={{ right: "0%", cursor: "pointer" }}
                          onClick={() => removeFile(file.image_name, ind)}
                        ></i>
                      </div>
                    );
                  })}
                </div>
              </FormGroup>
            </Col>
          </Row>

          <CommonModal
            centered
            isOpen={centred}
            toggle={centeredToggle}
            size="md"
          >
            <div className="modal-toggle-wrapper">
              {updateToken ? (
                <img
                  src={`${imagePath}/${coverImage}`}
                  alt="cover-image"
                  className="img-fluid"
                />
              ) : (
                <img src={prevImg} alt={prevImg ? prevImg : "cover-image"} className="img-fluid"/>
              )}

              <Button
                type="button"
                color="secondary"
                className="d-flex m-auto"
                onClick={centeredToggle}
              >
                Close
              </Button>
            </div>
          </CommonModal>

          <Row>

            <Col lg="3" md="6">
              <FormGroup>
                <Label check>{CoverImage}</Label>
                <div className="d-flex gap-1 align-items-center ">
                  <Input
                    required={coverImage ? false : true}
                    name="coverImage"
                    type="file"
                    className="form-control"
                    onChange={coverChange}
                    placeholder="Cover Image"
                  />
                  {coverImage && (
                    <p
                      className="py-1 px-3 bg-primary rounded"
                      style={{ cursor: "pointer" }}
                      onClick={() => setCentered(true)}
                    >
                      <i className="icofont icofont-eye-alt"></i>
                    </p>
                  )}
                </div>
                {/* <ErrorMessage
                name="coverImage"
                component="span"
                className="text-danger"
              /> */}
              </FormGroup>
            </Col>


           
            <Col lg="3" md="6">
              <FormGroup>
                <Label check>Title</Label>
                <Input
                  required
                  name="title"
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  onChange={(e: any) => setTitle(e.target.value)}
                  value={title}
                />
              </FormGroup>
            </Col>

            {/* <Col lg="3" md="6">
              <FormGroup>
                <Label>{Make}</Label>
                <Input
                  required
                  name="make"
                  type="select"
                  placeholder={Make}
                  className="form-control form-select"
                  onChange={(e: any) => setMakeId(e.target.value)}
                  value={makeId}
                >
                  <option value="" disabled>
                    Select Make
                  </option>
                  {makeData?.map((make: any) => (
                    <option key={make?.makeId} value={make?.makeId}>
                      {make.makeName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col> */}

            {/* <Col lg="3" md="6">
              <FormGroup>
                <Label>Brand</Label>
                <Input
                  required
                  name="model"
                  type="select"
                  disabled={makeOne?.length > 0 ? false : true}
                  placeholder={Model}
                  className="form-control form-select"
                  onChange={(e: any) => setModelName(e.target.value)}
                  value={modelName}
                >
                  <option value="" disabled>
                    Select Model
                  </option>
                  {makeOne?.map((model: any) => (
                    <option key={model?.modelId} value={model?.modelId}>
                      {model.modelName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col> */}

            {/* <Col lg="3" md="6">
              <FormGroup>
                <Label>Category</Label>
                <Input
                  required
                  name="year"
                  type="select"
                  disabled={makeYear?.length > 0 ? false : true}
                  placeholder={Year}
                  className="form-control form-select"
                  onChange={(e: any) => setYearName(e.target.value)}
                  value={yearName}
                >
                  <option value="" disabled>
                    Select Year
                  </option>
                  {makeYear?.map((year: any) => (
                    <option key={year?.yearId} value={year?.yearId}>
                      {year.year}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col> */}

           
            <Col lg="3" md="6">
              <FormGroup>
                <Label>Brand</Label>
                <Input
                  required
                  name="brand"
                  type="select"
                  placeholder={"Brand"}
                  className="form-control form-select"
                  onChange={(e: any) => setBrand(e.target.value)}
                  value={brand}
                >
                  <option value="" disabled selected>
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


            <Col lg="3" md="6">
              <FormGroup>
                <Label>Category</Label>
                <Input
                  required
                  name="category"
                  type="select"
                  placeholder={"Category"}
                  className="form-control form-select"
                  onChange={(e: any) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="" disabled selected>
                    Select Category
                  </option>
                  {CategoryList?.map((category: any) => (
                    <option key={category?.category_id} value={category?.category_id}>
                      {category.category_name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>





            <Col lg="3" md="6">
              <FormGroup>
                <Label check>Price</Label>
                <Input
                  required
                  name="price"
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  onChange={(e: any) => setPrice(parseInt(e.target.value))}
                  value={price}
                />
              </FormGroup>
            </Col>

            <Col lg="3" md="6">
              <FormGroup>
                <Label check>Discounted Price</Label>
                <Input
                  required
                  name="discounted_price"
                  type="number"
                  className="form-control"
                  placeholder="Discounted Price"
                  onChange={(e: any) => setDiscountedPrice(parseInt(e.target.value))}
                  value={discountedPrice}
                />
              </FormGroup>
            </Col>

          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Label check>{Description}</Label>
                <Editor
                  placeholder={description}
                  onEditorDataChange={handleEditorDataChange}
                />
              </FormGroup>
            </Col>
          </Row>

          <ButtonSection />
        </form>
      )}
    </>
  );
};

export default addproducts;