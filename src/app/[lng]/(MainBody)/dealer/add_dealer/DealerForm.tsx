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
import { ButtonSection } from "./ButtonSection";
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
  filename: string; // Adjust the type based on your actual data structure
  // Add other properties as needed
}

const AddDealerForm = () => {
  const router = useRouter();

  const { user }: any = useAppSelector((state) => state.user);

  const { i18LangStatus } = useAppSelector((state) => state.langSlice);

  const [submitting, setSubmitting] = useState(false);

  const [updateToken, setUpdateToken] = useState("");

  const [postToken, setPostToken] = useState("");
  const [imagePath, setImagePath] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<any>();
  const [city, setCity] = useState<any>();
  const [showRoomName, setShowRoomName] = useState("");
  const [showRoomPhone, setShowRoomPhone] = useState<any>();
  const [address, setAddress] = useState("");
  const [logo, setLogo] = useState("");

  // features

  const [coverImage, setCoverImage] = useState("");


  
  const [prevImg, setPrevImg] = useState<any>("");
  const [prevLogo, setPrevLogo] = useState<any>("");
  const [imageApi, setImageApi] = useState(true);
  const postDisabled = imageApi === false;
  const [open, setOpen] = useState(false);

  // features

  const [getUpdate, setGetUpdate] = useState(false);

  const [imagesPath, setImagesPath] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [files, setFiles] = useState<any[]>([]);
  const [moreImages, setMoreImages] = useState<any[]>([]);
  const [id, setId] = useState<string | null>(null);

  const generateToken = () => {
    const newToken = uuidv4().replace(/-/g, "").slice(0, 12);
    setPostToken(newToken);
  };

  const getDealerDetail = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/dealerdetails`, {
        params: {
          showroom_id: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImagesPath(response?.data?.imagepath)
      return response?.data?.details;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: dealerData,
    error: carError,
    isLoading: carLoading,
  } = useQuery(`getDealerData${id}`, getDealerDetail, {
    enabled: !!id, // Set enabled to false initially
  });

  // const getPostImages = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/postimages`, {
  //       params: {
  //         post_id: updateToken || postToken,
  //       },
  //     });

  //     setUploadedImages(response?.data?.images);
  //     // setMoreImages(response?.data?.images);
  //     setImagesPath(response?.data?.imagepath);

  //     return response?.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const {
  //   data: newImages,
  //   error: imgError,
  //   isLoading: imgLoading,
  // } = useQuery(`getCarImgs_${getUpdate}`, getPostImages, {
  //   enabled: !!updateToken,
  // });

  const extractTokenFromUrl = (url: string, paramName: string) => {
    const urlSearchParams = new URLSearchParams(url);
    return urlSearchParams.get(paramName);
  };

  useEffect(() => {
    const url = window.location.search;
    const ID = extractTokenFromUrl(url, "id");
    setId(ID);
    // Call the function when the component mounts
    if (!id) {
      generateToken();
    }
  }, []);

  useEffect(() => {
    setName(dealerData?.name);
    setEmail(dealerData?.email);
    setPhone(dealerData?.phone);
    setCity(dealerData?.city_id);
    setShowRoomName(dealerData?.showroom_name);
    setShowRoomPhone(parseInt(dealerData?.showroom_no));
    setCoverImage(dealerData?.showroom_cover)
    setAddress(dealerData?.showroom_address);
    setLogo(dealerData?.showroom_logo);
  }, [dealerData]);

  const updateFiles = async (incomingFiles: any) => {
    setFiles(incomingFiles);
    setMoreImages(incomingFiles);
    try {
      const formData: any = new FormData();
      formData.append("imagesList", null);
      formData.append(`post_token`, updateToken ? updateToken : postToken);

      files.forEach((image: any) => {
        formData.append(`file[]`, image.file);
      });

      // moreImages.forEach((image:any) => {
      //   formData.append(`file[]`, image.file);
      //   console.log("images",image)
      // });

      if (incomingFiles?.length > 0) {
        incomingFiles.forEach((image: any) => {
          formData.append(`file[]`, image.file);
        });
      }

      const response = await axios.post(`${BASE_URL}/savepostimage`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // if (response?.data) {
      //   setUploadedImages([...uploadedImages,...response?.data])
      // }
      // setMoreImages(response?.data?.adds)
      setNewFiles(response?.data?.adds);

      setImageApi(true);
    } catch (error) {
      console.error("image upload Error:", error);
    }
  };

  const removeFile = async (name: any, index: number) => {
    setFiles(files.filter((x: ExtFile) => x.id !== id));

    files.splice(index, 1);
    setFiles([...files]);

    moreImages.splice(index, 1);
    setMoreImages([...moreImages]);

    newFiles.splice(index, 1);
    setNewFiles([...newFiles]);

    try {
      const response = await axios.get(`${BASE_URL}/deleteImages`, {
        params: {
          post_id: updateToken ? updateToken : postToken,
          filename: name,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setGetUpdate(!getUpdate);
      setFiles(files.splice(0, index));
    } catch (error) {
      console.error("image delete Error:", error);
    }
  };

  const token = localStorage.getItem("authToken");

  const fetchCities = async () => {
    const res = await axios.get(`${BASE_URL}/cities`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  };

  const {
    data: cities,
    error,
    isLoading,
  } = useQuery(`dealerCity`, fetchCities);

  const coverChange = (e: any) => {
    const file = e.target.files[0];
    setCoverImage(file);

    const reader = new FileReader();

    reader.onload = () => {
      const imageSrc = reader.result;
      setPrevImg(imageSrc);
    };
    reader.readAsDataURL(file);
  };
  const logoChange = (e: any) => {
    const file = e.target.files[0];
    setLogo(file);

    const reader = new FileReader();

    reader.onload = () => {
      const imageSrc = reader.result;
      setPrevLogo(imageSrc);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    // if (files.length !== 0 || uploadedImages.length !== 0) {
    // prevImg.forEach((file) => {
    //   formData.append("imageFiles", file);
    // });
    if (!id) {
      formData.append("email", email);
      formData.append("phone", phone);
    }


if (id) {
  formData.append("showroom_id", id);
}

    formData.append("user_name", name);
    formData.append("showroom_name", showRoomName);
    formData.append("showroom_no", showRoomPhone);
    formData.append("showroom_address", address);
    formData.append("city_id", city);
    formData.append("showroom_cover", coverImage);
    formData.append("showroom_logo", logo);
    formData.append("user_id", user?.id);

    //   formData.append(
    //     `newcarpost_token`,
    //     updateToken ? updateToken : postToken
    //   );

    //   if (uploadedImages.length !== 0) {
    //     moreImages.forEach((image: any) => {
    //       formData.append(`imageFiles[]`, image.filename);
    //     });
    //   }

    //   if (files.length !== 0) {
    //     newFiles.forEach((image: any) => {
    //       formData.append(`imageFiles[]`, image);
    //     });
    //   }

    setSubmitting(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/${
          id ? "updatedealer" : "adddealer"
          // "adddealer"
        }`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response?.data?.success);
      // router.push(`/${i18LangStatus}/new_car/carpostlist`);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
    // } else {
    //   toast.error("Images Required");
    // }
  };

  const [centred, setCentered] = useState(false);
  const [logoModal, setLgoModal] = useState(false);

  const centeredToggle = () => {
    return setCentered(!centred);
  };
  const logoToggle = () => {
    return setLgoModal(!logoModal);
  };


console.log(imagesPath)

  return (
    <>
      {submitting ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <FormGroup>
                <Label check>Gallery Images</Label>
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
                        key={file.id}
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
                          src={`${imagesPath}/${updateToken || postToken}/${
                            file?.filename
                          }`}
                          className="img-fluid object-fit-contain rounded-4 "
                          alt={file.filename}
                        />
                        <i
                          className="icofont icofont-close-circled rounded-pill bg-primary fs-6 position-absolute top-0 z-3 m-1"
                          style={{ right: "0%", cursor: "pointer" }}
                          onClick={() => removeFile(file.filename, ind)}
                        ></i>
                      </div>
                    );
                  })}
                </div>
              </FormGroup>
            </Col>
          </Row>

          <h1 className="faq-title">Basic Information</h1>

          <CommonModal
            centered
            isOpen={centred}
            toggle={centeredToggle}
            size="md"
          >
            <div className="modal-toggle-wrapper">
              {id && !prevImg ? (
                // {imagepath}/${dealerData?.user_id}/${dealerData?.showroom_cover}
                <img
                  src={`${imagesPath}/${dealerData?.user_id}/${coverImage}`}
                  alt={coverImage}
                  className="img-fluid"
                />
              ) : prevImg ? (
                <img src={prevImg} alt="cover-image" className="img-fluid" />
              ):null}

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

          <CommonModal
            centered
            isOpen={logoModal}
            toggle={logoToggle}
            size="md"
          >
            <div className="modal-toggle-wrapper">
              {id && !prevLogo ? (
                // {imagepath}/${dealerData?.user_id}/${dealerData?.showroom_cover}
                <img
                  src={`${imagesPath}/${dealerData?.user_id}/${logo}`}
                  alt={logo}
                  className="img-fluid"
                />
              ) : prevLogo ? (
                <img src={prevLogo} alt="cover-image" className="img-fluid" />
              ):null}

              <Button
                type="button"
                color="secondary"
                className="d-flex m-auto"
                onClick={logoToggle}
              >
                Close
              </Button>
            </div>
          </CommonModal>

          <Row>
            <Col lg="3" md="6">
              <FormGroup>
                <Label check>Full Name</Label>
                <Input
                  required
                  name="color"
                  type="text"
                  className="form-control"
                  placeholder="Dealer Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col lg="3" md="6">
              <FormGroup>
                <Label check>Email</Label>
                <Input
                  required
                  name="color"
                  type="email"
                  className="form-control"
                  placeholder="Dealer Email"
                  readOnly={id ? true : false}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col lg="3" md="6">
              <FormGroup>
                <Label check>Phone</Label>
                <Input
                  required
                  name="color"
                  type="number"
                  className="form-control"
                  placeholder="e.g.  0300123456"
                  readOnly={id ? true : false}
                  value={phone}
                  onChange={(e: any) => setPhone(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col lg="3" md="6">
              <FormGroup>
                <Label>City</Label>
                <Input
                  required
                  name="bodyType"
                  type="select"
                  placeholder={BodyType}
                  className="form-control form-select"
                  value={city}
                  onChange={(e: any) => setCity(e.target.value)}
                >
                  <option value="" disabled>
                    Select Dealer City
                  </option>
                  {cities?.map((city: any) => (
                    <option key={city?.cityID} value={parseInt(city?.cityID)}>
                      {city.cityName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <h1 className="faq-title">ShowRoom Info</h1>

          <Row>
            <Col lg="3" md="6">
              <FormGroup>
                <Label check>Showroom Name</Label>
                <Input
                  required
                  name="color"
                  type="text"
                  className="form-control"
                  placeholder="Showroom Name"
                  value={showRoomName}
                  onChange={(e) => setShowRoomName(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col lg="3" md="6">
              <FormGroup>
                <Label check>Contact</Label>
                <Input
                  required
                  name="color"
                  type="number"
                  className="form-control"
                  placeholder="Showroom Number"
                  value={showRoomPhone}
                  onChange={(e: any) => setShowRoomPhone(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col lg="3" md="6">
              <FormGroup>
                <Label check>Showroom Cover Image</Label>
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
              </FormGroup>
            </Col>

            <Col lg="3" md="6">
              <FormGroup>
                <Label check>Showroom Logo</Label>
                <div className="d-flex gap-1 align-items-center ">
                  <Input
                    required={logo ? false : true}
                    name="coverImage"
                    type="file"
                    className="form-control"
                    onChange={logoChange}
                    placeholder="Cover Image"
                  />
                  {logo && (
                    <p
                      className="py-1 px-3 bg-primary rounded"
                      style={{ cursor: "pointer" }}
                      onClick={() => setLgoModal(true)}
                    >
                      <i className="icofont icofont-eye-alt"></i>
                    </p>
                  )}
                </div>
              </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label check>Address</Label>
                <Input
                  required
                  name="color"
                  type="textarea"
                  rows={4}
                  className="form-control"
                  placeholder="Showroom Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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

export default AddDealerForm;
