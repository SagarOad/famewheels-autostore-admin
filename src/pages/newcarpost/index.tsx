import React, { FormEvent, useEffect, useState } from "react";
import PostInfo from "../../../public/assets/post-info.png";
import PostPhotos from "../../../public/assets/post-photos.png";
import PostPrice from "../../../public/assets/post-price.png";
import Redtick from "../../../public/assets/Red_tick.png";
import Image from "next/image";
// import SideBar from "@/components/SideBar";
import { useQuery } from "react-query";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import PrivateRoute from "@/route/PrivateRoute";
import { ImpulseSpinner } from "react-spinners-kit";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

interface IBidding {
  returnValue: string;
  year: number;
  yearId: number;
  category: string | number;
  makeId: number;
  makeName: string;
  modelId: number;
  modelName: string;
  city: string;
  postId: number;
  title: string;
  categoryName: string;
  cityName: string;
  registeredIn: string;
  price: string;
  userName: string;
  description: string;
  phone: string | number;
}

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const index = () => {
  const token = localStorage.getItem("authToken");

  const [submitting, setSubmitting] = useState(false);

  const [postToken, setPostToken] = useState("");

  useEffect(() => {
    // Function to generate a 12-digit token
    const generateToken = () => {
      const newToken = uuidv4().replace(/-/g, "").slice(0, 12);
      setPostToken(newToken);
    };

    // Call the function when the component mounts
    generateToken();
  }, []);

  const [auctionDate, setAuctionDate] = useState("");
  const [varient, setVarient] = useState("");
  const [bodyType, setBodytype] = useState("");
  const [exFactoryPrice, setExfactoryPrice] = useState<number>();
  const [overallLength, setOverallLength] = useState<number | undefined>();
  const [kerbWeight, setKerbWeight] = useState<number | undefined>();
  const [overallWidth, setOverallWidth] = useState<number | undefined>();
  const [bootSpaceL, setBootSpaceL] = useState<number | undefined>();
  const [wheelBase, setWheelBase] = useState<number | undefined>();
  const [noOfDoors, setNoOfDoors] = useState<number | undefined>();
  const [groundClearance, setGroundClearance] = useState<number | undefined>();
  const [seatingCapacity, setSeatingCapacity] = useState<number | undefined>();
  const [engineType, setEngineType] = useState("");
  const [turboCharger, setTurboCharger] = useState("");
  const [displacement, setDisplacement] = useState<number | undefined>();
  const [noOfCylinders, setNoOfCylinders] = useState<number | undefined>();
  const [horsePower, setHorsePower] = useState<number | undefined>();
  const [rpm, setRPM] = useState<number | undefined>();
  const [valvesPerCylinder, setValvesPerCylinder] = useState<
    number | undefined
  >();
  const [fuelSystem, setFuelSystem] = useState("");
  const [fuelTankCapacity, setFuelTankCapacity] = useState("");
  const [mileageCity, setMileageCity] = useState("");
  const [mileageHighway, setMileageHighway] = useState("");
  const [maxSpeed, setMaxSpeed] = useState<number | undefined>();
  const [gearBox, setGearBox] = useState<number | undefined>();
  const [steeringType, setSteeringType] = useState("");
  const [powerAssisted, setPowerAssisted] = useState("");
  const [frontSuspension, setFrontSuspension] = useState("");
  const [frontBrakes, setFrontBrakes] = useState("");
  const [rearSuspension, setRearSuspension] = useState("");
  const [rearBrakes, setRearBrakes] = useState("");
  const [wheelType, setWheelType] = useState("");
  const [wheelSize, setWheelSize] = useState<number | undefined>();
  const [spareTyre, setSpareTyre] = useState("");
  const [spareTyreSize, setSpareTyreSize] = useState<number | undefined>();
  const [tyreSizeWidth, setTyreSizeWidth] = useState<number | undefined>();
  const [tyreSizeRatio, setTyreSizeRatio] = useState<number | undefined>();
  const [tyreSizeDiameter, setTyreSizeDiameter] = useState("");

  // features

  const [speedSensingDoorLock, setSpeedSensingDoorLock] = useState("false");
  const [antiTheftAlarmSystem, setAntiTheftAlarmSystem] = useState("false");
  const [driverSeatBeltWarning, setDriverSeatBeltWarning] = useState("false");
  const [downHillAssistControl, setDownHillAssistControl] = useState("false");
  const [passengerSeatBeltWarning, setPassengerSeatBeltWarning] =
    useState("false");
  const [hillStartAssistControl, setHillStartAssistControl] = useState("false");
  const [immobilizer, setImmobilizer] = useState("false");
  const [tractionControl, setTractionControl] = useState("false");
  const [vehicleStabilityControl, setVehicleStabilityControl] =
    useState("false");
  const [blindSpotDetection, setBlindSpotDetection] = useState("false");
  const [antiLockBrakingSystem, setAntiLockBrakingSystem] = useState("false");
  const [doorOpeningWarning, setDoorOpeningWarning] = useState("false");
  const [laneKeepAssistSystem, setLaneKeepAssistSystem] = useState("false");
  const [electricBrakeForce, setElectricBrakeForce] = useState("false");
  const [autonomousEmergencyBraking, setAutonomousEmergencyBraking] =
    useState("false");
  const [alloyWheels, setAlloyWheels] = useState("false");
  const [adjustableHeadlights, setAdjustableHeadlights] = useState("false");
  const [rearSpoiler, setRearSpoiler] = useState("false");
  const [sideMirrorIndicators, setSideMirrorIndicators] = useState("false");
  const [panaromic, setPanaromic] = useState("false");
  const [fogLights, setFogLights] = useState("false");
  const [DRLs, setDRLs] = useState("false");
  const [roofRails, setRoofRails] = useState("");
  const [sideSteps, setSideSteps] = useState("false");
  const [dualExhaust, setDualExhaust] = useState("false");
  const [tachometer, setTachometer] = useState("false");
  const [multiInfo, setMultiInfo] = useState("false");
  const [infoCluster, setInfoCluster] = useState("false");
  const [displaySize, setDisplaySize] = useState("false");
  const [usbAuxilaryCable, setUSBAuxilaryCable] = useState("false");
  const [noOfSpeakers, setNoOfSpeakers] = useState("");
  const [voiceControl, setVoiceControl] = useState("false");
  const [androidAuto, setAndroidAuto] = useState("false");
  const [appleCarPlay, setAppleCarPlay] = useState("false");
  const [seatMaterialType, setSeatMaterialType] = useState("false");
  const [keyType, setKeyType] = useState("false");
  const [cruiseControl, setCruiseControl] = useState("false");
  const [rainSensingWiper, setRainSensingWiper] = useState("false");
  const [drivingModes, setDrivingModes] = useState("false");
  const [paddleShifter, setPaddleShifter] = useState("false");
  const [heater, setHeater] = useState("false");
  const [pushStart, setPushStart] = useState("false");
  const [coolBox, setCoolBox] = useState("false");
  const [remoteEngineStart, setRemoteEngineStart] = useState("false");
  const [navigation, setNavigation] = useState("false");
  const [centralLocking, setCentralLocking] = useState("false");
  const [powerDoorLocks, setPowerDoorLocks] = useState("false");
  const [autoRetractableSideMirror, setAutoRetractableSideMirror] =
    useState("false");
  const [frontParkingSensors, setFrontParkingSensors] = useState("false");
  const [rearParkingSensors, setRearParkingSensors] = useState("false");
  const [armRest, setArmRest] = useState("false");
  const [rearFoldingSeat, setRearFoldingSeat] = useState("false");
  const [handBrake, setHandBrake] = useState("");
  const [rearHeadRest, setRearHeadRest] = useState("false");
  const [autoBrakeHold, setAutoBrakeHold] = useState("false");
  const [rearWiper, setRearWiper] = useState("false");
  const [autoParkingSystem, setAutoParkingSystem] = useState("false");
  const [driverSeatElectricAdjustment, setDriverSeatElectricAdjustment] =
    useState("false");
  const [driverSeatLumbarSupport, setDriverSeatLumbarSupport] =
    useState("false");
  const [driverSeatMemoryFunction, setDriverSeatMemoryFunction] =
    useState("false");
  const [frontPowerOutlet, setFrontPowerOutlet] = useState("false");
  const [reartPowerOutlet, setRearPowerOutlet] = useState("false");
  const [steeringAdjustment, setSteeringAdjustment] = useState("false");
  const [wirelessCharger, setWirelessCharger] = useState("false");
  const [headlightReminder, setHeadlightReminder] = useState("false");
  const [bossSeatSwitch, setBossSeatSwitch] = useState("false");
  const [automaticHeadLamps, setAutomaticHeadLamps] = useState("false");
  const [tyrePressureMonitoringSystem, setTyrePressureMonitoringSystem] =
    useState("false");
  const [passengerSeatElectricAdjustment, setPassengerSeatElectricAdjustment] =
    useState("false");

  const [coverImage, setCoverImage] = useState("");
  const [color, setColor] = useState("");
  const [makeId, setMakeId] = useState("");
  const [modelName, setModelName] = useState("");
  const [yearName, setYearName] = useState("");
  const [transmission, setTransmission] = useState("");
  const [vehicleCondition, setVehicleCondition] = useState("");
  const [vehicleFuel, setVehicleFuel] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const [price, setPrice] = useState<number | undefined>();
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("");
  const [randomString, setRandomString] = useState("");
  const [description, setDescription] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [makeName, setMakeName] = useState("");
  const [vehicleColour, setVehicleColour] = useState("");
  const [startingAmount, setStartingAmount] = useState("");
  const [prevImg, setPrevImg] = useState<File[]>([]);
  const [imageApi, setImageApi] = useState(true);
  const postDisabled = imageApi === false;
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  // features

  const [abs, setABS] = useState("false");
  const [airbags, setAirBags] = useState("");
  const [seatbelts, setSeatbelts] = useState("");
  const [airconditioning, setAirConditioning] = useState("false");
  const [fm, setFM] = useState("false");
  const [cassettePlayer, setCassettePlayer] = useState("false");
  const [cdPlayer, setCDPlayer] = useState("false");
  const [dvdPlayer, setDVDPlayer] = useState("false");
  const [climateControl, setClimateControl] = useState("false");
  const [frontCamera, setFrontCamera] = useState("false");
  const [Camera360, setCamera360] = useState("false");
  const [frontSpeakers, setFrontSpeakers] = useState("false");
  const [heatedSeats, setHeatedSeats] = useState("false");
  const [immobilizerKey, setImmobilizerKey] = useState("false");
  const [keylessEntry, setKeylessEntry] = useState("false");
  const [navigationSystem, setNavigationSystem] = useState("false");
  const [powerLocks, setPowerLocks] = useState("false");
  const [powerMirrors, setPowerMirrors] = useState("false");
  const [powerSteering, setPowerSteering] = useState("false");
  const [powerWindows, setPowerWindows] = useState("false");
  const [rearACVents, setRearACVents] = useState("false");
  const [rearCamera, setRearCamera] = useState("false");
  const [rearSeatEntertainment, setRearSeatEntertainment] = useState("false");
  const [rearSpeakers, setRearSpeakers] = useState("false");
  const [steeringSwitches, setSteeringSwitches] = useState("false");
  const [sunRoof, setSunRoof] = useState("false");
  const [usb, setUSB] = useState("false");
  const [alloyRims, setAlloyRims] = useState("false");
  const [assembly, setAssembly] = useState("Local");

  const [uploadedImages, setUploadedImages] = useState([]);

  const dimensions = {
    overallLength,
    kerbWeight,
    overallWidth,
    bootSpaceL,
    wheelBase,
    noOfDoors,
    groundClearance,
    seatingCapacity,
  };
  const dimensionsJSON = JSON.stringify(dimensions);

  const EngineMotor = {
    engineType,
    turboCharger,
    displacement,
    noOfCylinders,
    horsePower,
    rpm,
    valvesPerCylinder,
    fuelSystem,
    maxSpeed,
  };
  const EngineMotorJSON = JSON.stringify(EngineMotor);

  const Transmission = { transmission, gearBox };
  const TransmissionJSON = JSON.stringify(Transmission);

  const Steering = { steeringType, powerAssisted };
  const SteeringJSON = JSON.stringify(Steering);

  const suspensionBrakes = {
    frontSuspension,
    frontBrakes,
    rearSuspension,
    rearBrakes,
  };
  const suspensionBrakesJSON = JSON.stringify(suspensionBrakes);

  const WheelsandTyres = {
    wheelType,
    wheelSize,
    spareTyre,
    spareTyreSize,
    tyreSizeWidth,
    tyreSizeRatio,
    tyreSizeDiameter,
  };
  const WheelsandTyresJSON = JSON.stringify(WheelsandTyres);

  const FuelEconomy = { fuelTankCapacity, mileageCity, mileageHighway };
  const FuelEconomyJSON = JSON.stringify(FuelEconomy);

  const Safety = {
    speedSensingDoorLock,
    antiTheftAlarmSystem,
    driverSeatBeltWarning,
    downHillAssistControl,
    passengerSeatBeltWarning,
    hillStartAssistControl,
    immobilizer,
    tractionControl,
    vehicleStabilityControl,
    blindSpotDetection,
    antiLockBrakingSystem,
    doorOpeningWarning,
    laneKeepAssistSystem,
    electricBrakeForce,
    autonomousEmergencyBraking,
    airbags,
    seatbelts,
  };
  const SafetyJSON = JSON.stringify(Safety);

  const Exterior = {
    alloyWheels,
    adjustableHeadlights,
    rearSpoiler,
    sideMirrorIndicators,
    sunRoof,
    panaromic,
    fogLights,
    DRLs,
    roofRails,
    sideSteps,
    dualExhaust,
  };
  const ExteriorJSON = JSON.stringify(Exterior);

  const Instrumentation = {
    tachometer,
    multiInfo,
    infoCluster,
  };
  const InstrumentationJSON = JSON.stringify(Instrumentation);

  const Infotainment = {
    displaySize,
    usbAuxilaryCable,
    cdPlayer,
    dvdPlayer,
    noOfSpeakers,
    frontSpeakers,
    rearSpeakers,
    rearSeatEntertainment,
    voiceControl,
    androidAuto,
    appleCarPlay,
  };
  const InfotainmentJSON = JSON.stringify(Infotainment);

  const ComfortandConvenience = {
    seatMaterialType,
    keyType,
    airconditioning,
    rainSensingWiper,
    climateControl,
    cruiseControl,
    rearACVents,
    drivingModes,
    paddleShifter,
    heater,
    heatedSeats,
    keylessEntry,
    pushStart,
    coolBox,
    remoteEngineStart,
    navigation,
    centralLocking,
    powerDoorLocks,
    frontCamera,
    rearCamera,
    Camera360,
    powerWindows,
    powerMirrors,
    autoRetractableSideMirror,
    frontParkingSensors,
    rearParkingSensors,
    armRest,
    rearFoldingSeat,
    handBrake,
    rearHeadRest,
    autoBrakeHold,
    rearWiper,
    autoParkingSystem,
    driverSeatElectricAdjustment,
    driverSeatLumbarSupport,
    driverSeatMemoryFunction,
    frontPowerOutlet,
    reartPowerOutlet,
    steeringAdjustment,
    steeringSwitches,
    wirelessCharger,
    headlightReminder,
    bossSeatSwitch,
    automaticHeadLamps,
    tyrePressureMonitoringSystem,
    passengerSeatElectricAdjustment,
  };
  const ComfortandConvenienceJSON = JSON.stringify(ComfortandConvenience);

  const fetchCities = async () => {
    const res = await axios.get(`${BASE_URL}/cities`, {
      params: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const {
    data: cityData,
    error: cityError,
    isLoading: cityLoading,
  } = useQuery("myCity", fetchCities);

  const fetchMake = async () => {
    const res = await axios.get(`${BASE_URL}/byMake`, {
      params: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const {
    data: makeData,
    error: makeError,
    isLoading: makeLoading,
  } = useQuery("myMake", fetchMake);

  const fetchMakeById = async () => {
    const res = await axios.get(`${BASE_URL}/model-by-make`, {
      params: {
        make_id: makeId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const {
    data: makeOne,
    error: makeOneError,
    isLoading: makeOneLoading,
  } = useQuery(`myModelsById_${makeId}`, fetchMakeById, {
    enabled: !!makeId, // Set enabled to false initially
  });

  const fetchModelYear = async () => {
    const res = await axios.get(`${BASE_URL}/getModelYear`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const {
    data: makeYear,
    error: makeYearError,
    isLoading: makeYearLoading,
  } = useQuery(`myMakeById_${modelName}`, fetchModelYear);

  const fetchBodyType = async () => {
    const res = await axios.get(`${BASE_URL}/bodytypelist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const {
    data: bodyTypes,
    error,
    isLoading,
  } = useQuery(`newCarBodyType`, fetchBodyType);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = Array.from(e.target.files as FileList);
    const uploadedImages: string[] = [];

    if (images.length + files.length > 20) {
      setImageErrorMessage("Maximum number of images exceeded!");
      setOpen(true);
      return;
    }

    files.forEach((file) => {
      setPrevImg((prevImg: File[]) => [...prevImg, file]);

      if (file.size <= 20 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            const imageSrc: string | ArrayBuffer | null = reader.result;

            if (
              imageSrc &&
              typeof imageSrc === "string" &&
              images.length < 20 &&
              !images.includes(imageSrc)
            ) {
              uploadedImages.push(imageSrc);
              setImages((prevImages: string[]) => [...prevImages, imageSrc]);
              setImageErrorMessage("");
            } else if (images.includes(imageSrc as string)) {
              setImageErrorMessage("Duplicate image detected!");
              setOpen(true);
            } else if (images.length > 20) {
              setImageErrorMessage("Maximum number of images exceeded!");
              setOpen(true);
            } else {
              setImageErrorMessage("File size limit exceeded (20MB)!");
              setOpen(true);
            }
          }
        };

        reader.readAsDataURL(file);
      } else {
        setImageErrorMessage("File size limit exceeded (20MB)!");
        setOpen(true);
      }
    });
    try {
      const formData = new FormData();
      formData.append("imagesList", null);
      formData.append(`post_token`, postToken);

      files.forEach((image) => {
        formData.append(`file[]`, image);
      });

      if (prevImg?.length > 0) {
        prevImg.forEach((image) => {
          formData.append(`file[]`, image);
        });
      }

      const response = await axios.post(`${BASE_URL}/savepostimage`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadedImages(response?.data);
      setImageApi(true);
    } catch (error) {
      console.error("image upload Error:", error);
    }
  };

  const handleImageDelete = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    uploadedImages.splice(index + 1, 1);
    setUploadedImages(uploadedImages);
    // if (newImages.length === 0) {
    //   setImageErrorMessage("");
    // }
  };

  const coverChange = (e: any) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (prevImg.length === 0) {
      toast.error("Images Required");
    } else {
      // prevImg.forEach((file) => {
      //   formData.append("imageFiles", file);
      // });

      formData.append("newcarpost_cover", coverImage);
      formData.append("newcarpost_dimensions", `${dimensionsJSON}`);
      formData.append("newcarpost_enginemotor", `${EngineMotorJSON}`);
      formData.append("newcarpost_transmission", TransmissionJSON);
      formData.append("newcarpost_steering", SteeringJSON);
      formData.append("newcarpost_suspensionbrakes", suspensionBrakesJSON);
      formData.append("newcarpost_wheeltyres", WheelsandTyresJSON);
      formData.append("newcarpost_fueleconomy", FuelEconomyJSON);
      formData.append("newcarpost_safety", SafetyJSON);
      formData.append("newcarpost_exterior", ExteriorJSON);
      formData.append("newcarpost_instrumentation", InstrumentationJSON);
      formData.append("newcarpost_Infotainment", InfotainmentJSON);
      formData.append(
        "newcarpost_comfortconvenience",
        ComfortandConvenienceJSON
      );
      formData.append(`newcarpost_token`, postToken);
      formData.append(`newcarpost_launchdate`, launchDate);
      formData.append(`make_id`, makeId);
      formData.append(`model_id`, modelName);
      formData.append(`year_id`, yearName);
      formData.append(`newcarpost_price`, `${exFactoryPrice}`);
      formData.append(`newcarpost_color`, `${color}`);
      formData.append(`newcarpost_bodytype`, `${bodyType}`);
      formData.append(`newcarpost_variants`, `${varient}`);
      formData.append(`newcarpost_overview`, `${description}`);
      formData.append(`bodytype_id`, `${bodyType}`);

      uploadedImages.forEach((image) => {
        formData.append(`imageFiles[]`, image);
      });
      setSubmitting(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/savenewcarpost`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // toast.success(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleMakeChange = (e: any) => {
    const selectedMake = makeData.find(
      (item: IBidding) => item.makeName === e.target.value
    );
    if (selectedMake) {
      setMakeId(selectedMake.makeId);
      setMakeName(selectedMake.makeName);
    } else {
      setMakeId("");
    }
    setMakeName(e.target.value);
  };

  useEffect(() => {
    const generateRandomString = () => {
      const length = 8;
      const characters = "0123456789abcdefg";
      let randomString = "";

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
      }

      return randomString;
    };

    const generatedString = generateRandomString();
    setRandomString(generatedString);
  }, []);

  const formatPrice = (price: number) => {
    if (price > 0) {
      if (price >= 100000000000) {
        return (
          (price / 100000000000).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          }) + " Kharab"
        );
      } else if (price >= 1000000000) {
        return (
          (price / 1000000000).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          }) + " Arab"
        );
      } else if (price >= 10000000) {
        return (
          (price / 10000000).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          }) + " Crore"
        );
      } else if (price >= 100000) {
        return (
          (price / 100000).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          }) + " lacs"
        );
      } else if (price >= 1000) {
        return (
          (price / 1000).toLocaleString("en-US", { maximumFractionDigits: 2 }) +
          " Thousand"
        );
      } else {
        // return price.toLocaleString("en-US", { maximumFractionDigits: 2 });
        return price;
      }
    }
  };

  const seats = [
    {
      title: "1",
      value: "1",
    },
    {
      title: "2",
      value: "2",
    },
    {
      title: "3",
      value: "3",
    },
    {
      title: "4",
      value: "4",
    },
    {
      title: "5",
      value: "5",
    },
    {
      title: "6",
      value: "6",
    },
    {
      title: "7",
      value: "7",
    },
    {
      title: "8",
      value: "8",
    },
    {
      title: "9",
      value: "9",
    },
    {
      title: "10",
      value: "10",
    },
    {
      title: "11",
      value: "11",
    },
    {
      title: "12",
      value: "12",
    },
    {
      title: "13",
      value: "13",
    },
    {
      title: "14",
      value: "14",
    },
    {
      title: "15",
      value: "15",
    },
  ];

  const featureSelection = [
    {
      title: "true",
      value: "true",
    },
    {
      title: "false",
      value: "false",
    },
  ];

  return (
    <PrivateRoute requiredRoles={["ROLE_BIDDER", "ROLE_ADMIN"]}>
      <section className="flex justify-center items-center w-[80vw] max-lg:w-[100vw]">
        <section className="flex justify-center items-center">
          <div className="w-full mt-10 xl:mt-8 container">
            <h1 className="font-bold px-4 text-4xl mt-2 mb-3">Vehicles</h1>
            <h4 className="px-4">
              Dashboard /{" "}
              <span className="text-[#ED2024]">Add New Vehicle</span>
            </h4>

            <div className="">
              <main className="p-4 w-full">
                <form onSubmit={handleSubmit}>
                  <section className="w-full mt-3">
                    <h1 className="text-blue-700 text-center text-2xl">
                      Upload Photos
                    </h1>

                    <div className="border-2 outline-red-500 border-dashed border-blue-500 my-3 rounded-lg p-3">
                      <p className="text-center text-red-600">
                        (Max limit 5 MB per image)
                      </p>

                      <p className="text-center my-2">
                        Drag and drop images here
                      </p>

                      <div className="flex justify-center items-center my-2">
                        <label htmlFor="img" className="">
                          <p className="p-2 bg-blue-500 rounded-lg cursor-pointer text-white font-semibold">
                            upload images
                          </p>
                        </label>
                      </div>

                      <input
                        className="hidden"
                        id="img"
                        type="file"
                        multiple={true}
                        name="img"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />

                      <div className="flex gap-2 flex-wrap">
                        {images.map((image, index) => (
                          <div
                            key={index}
                            className="border-2 border-gray-200 outline-red-500 p-1 rounded-md w-fit"
                          >
                            <div className="flex items-end justify-end">
                              <button
                                className="btn"
                                onClick={(e) => handleImageDelete(index, e)}
                              >
                                <CloseIcon color="error" />
                              </button>
                            </div>
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="w-[300px] object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <h1 className="text-2xl font-bold text-center mt-3">
                    Basic Information
                  </h1>
                  <section className="grid grid-cols-12 col-span-12">
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="make">Cover Image</label>
                      <input
                        type="file"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        onChange={coverChange}
                        required
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="make">Make</label>

                      <select
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        onChange={handleMakeChange}
                        required
                      >
                        <option value="" selected disabled hidden>
                          Select Make
                        </option>

                        {makeData &&
                          makeData.map((t: any) => (
                            <option key={t.makeId}>{t.makeName}</option>
                          ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="model">Model</label>

                      <select
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        disabled={!makeId ? true : false}
                        onChange={(e) => setModelName(e.target.value)}
                        required
                      >
                        <option value="" selected disabled hidden>
                          Select {makeName} Model
                        </option>

                        {makeOne &&
                          makeOne.map((t: any) => (
                            <option key={t.mmodelId} value={t.mmodelId}>
                              {t.modelName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="year">Year</label>

                      <select
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        disabled={!makeId || !modelName ? true : false}
                        onChange={(e) => setYearName(e.target.value)}
                        required
                      >
                        <option value="" selected disabled hidden>
                          Select {modelName} Year
                        </option>

                        {makeYear &&
                          makeYear.map((t: any) => (
                            <option key={t.yearId} value={t.yearId}>
                              {t.year}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="varient">Varient</label>

                      <input
                        type="text"
                        name=""
                        id=""
                        value={varient}
                        onChange={(e) => setVarient(e.target.value)}
                        placeholder="Varient"
                        required
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="BodyType">Body Type</label>

                      <select
                        name="transmission"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        id="vehicleTransmission"
                        aria-label="Default select example"
                        required
                        value={bodyType}
                        onChange={(e) => setBodytype(e.target.value)}
                      >
                        <option selected value="">
                          Select Body Type
                        </option>
                        {bodyTypes &&
                          bodyTypes.map((t: any) => (
                            <option key={t.bodytype_id} value={t.bodytype_id}>
                              {t.bodytype_name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="Color">Color</label>

                      <input
                        type="text"
                        placeholder="Vehicle Color"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        required
                      />
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="Price">EX-Factory Price</label>
                      <input
                        type="number"
                        placeholder="EX-Factory Price"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={exFactoryPrice}
                        onChange={(e) =>
                          setExfactoryPrice(parseInt(e.target.value))
                        }
                        required
                      />
                      <span
                        className="input-group-text text-white"
                        id="basic-addon2"
                      >
                        PKR
                      </span>
                      {exFactoryPrice && exFactoryPrice > 0 ? (
                        <div
                          id="vehiclePrice"
                          className="form-text"
                          style={{ height: 25, textTransform: "capitalize" }}
                        >
                          {formatPrice(exFactoryPrice)}
                        </div>
                      ) : null}
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="LaunchDate">Launch Date</label>
                      <input
                        type="date"
                        placeholder="Launch Date"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={launchDate}
                        onChange={(e) => setLaunchDate(e.target.value)}
                      />
                    </div>
                  </section>
                  <section>
                    <div className="grid grid-cols-12 col-span-12">
                      <div className="col-span-12 m-2">
                        <label htmlFor="Description">Description</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                          rows={5}
                          placeholder="Detailed overview"
                          required
                        ></textarea>
                      </div>
                    </div>
                  </section>
                  <h1 className="text-2xl font-bold text-center m-3">
                    Dimension
                  </h1>
                  <section className="grid grid-cols-12 col-span-12">
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="Overall">Overall Length (MM)</label>
                      <input
                        type="number"
                        placeholder="Length (MM)"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={overallLength}
                        onChange={(e) =>
                          setOverallLength(parseInt(e.target.value))
                        }
                        required
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="Kerb">Kerb Weight (KG)</label>
                      <input
                        type="number"
                        placeholder="Weight (KG)"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={kerbWeight}
                        onChange={(e) =>
                          setKerbWeight(parseInt(e.target.value))
                        }
                        required
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="featurecheck">Overall Width (MM)</label>
                      <input
                        type="number"
                        placeholder="Width (MM)"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={overallWidth}
                        onChange={(e) =>
                          setOverallWidth(parseInt(e.target.value))
                        }
                        required
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="featurecheck">Boot Space (L)</label>
                      <input
                        type="number"
                        placeholder="Space (L)"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={bootSpaceL}
                        onChange={(e) =>
                          setBootSpaceL(parseInt(e.target.value))
                        }
                        required
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="featurecheck">Wheel Base (MM)</label>
                      <input
                        type="number"
                        placeholder="Base (MM)"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={wheelBase}
                        onChange={(e) => setWheelBase(parseInt(e.target.value))}
                        required
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="featurecheck">No. of Doors</label>
                      <input
                        type="number"
                        placeholder="Doors"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={noOfDoors}
                        onChange={(e) => setNoOfDoors(parseInt(e.target.value))}
                        required
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="featurecheck">
                        Ground Clearence (MM)
                      </label>
                      <input
                        type="number"
                        placeholder="Clearence (MM)"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={groundClearance}
                        onChange={(e) =>
                          setGroundClearance(parseInt(e.target.value))
                        }
                        required
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="featurecheck">Seating Capacity</label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={seatingCapacity}
                        onChange={(e) =>
                          setSeatingCapacity(parseInt(e.target.value))
                        }
                      >
                        {seats?.map((item, index) => (
                          <option selected value={parseInt(item?.value)}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </section>
                  <h1 className="text-2xl font-bold text-center m-3">
                    Engine/ Motor
                  </h1>
                  <section className="grid grid-cols-12 col-span-12">
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="Overall">Engine Type</label>
                      <select
                        id="EngineType"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={engineType}
                        onChange={(e) => setEngineType(e.target.value)}
                      >
                        <option selected value="Petrol">
                          Petrol
                        </option>
                        <option selected value="Diesel">
                          Diesel
                        </option>
                        <option selected value="CNG">
                          CNG
                        </option>
                        <option selected value="Hybrid">
                          Hybrid
                        </option>
                        <option selected value="Electric">
                          Electric
                        </option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="Overall">Turbo Charger</label>
                      <select
                        id="TurboCharger"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={turboCharger}
                        onChange={(e) => setTurboCharger(e.target.value)}
                      >
                        <option selected value="yes">
                          Yes
                        </option>
                        <option selected value="no">
                          No
                        </option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="Displacement">Displacement</label>
                      <input
                        type="number"
                        name=""
                        id="Displacement"
                        placeholder="Engine Size (cc)"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={displacement}
                        onChange={(e) =>
                          setDisplacement(parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="NoofCylinders">No. of Cylinders</label>
                      <input
                        type="number"
                        name=""
                        id="NoofCylinders"
                        placeholder="Cylinders"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={noOfCylinders}
                        onChange={(e) =>
                          setNoOfCylinders(parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="HorsePower">Horse Power</label>
                      <input
                        type="number"
                        name=""
                        id="HorsePower"
                        placeholder="HP@"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={horsePower}
                        onChange={(e) =>
                          setHorsePower(parseInt(e.target.value))
                        }
                      />
                      <input
                        type="number"
                        name=""
                        id="HorsePower"
                        placeholder="RPM"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={rpm}
                        onChange={(e) => setRPM(parseInt(e.target.value))}
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="ValvesperCylinder">
                        Valves per Cylinder
                      </label>
                      <input
                        type="number"
                        name=""
                        id="ValvesperCylinder"
                        placeholder="Valves"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={valvesPerCylinder}
                        onChange={(e) =>
                          setValvesPerCylinder(parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="FuelSystem">Fuel System</label>
                      <input
                        type="text"
                        name=""
                        id="FuelSystem"
                        placeholder="Fuel System"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={fuelSystem}
                        onChange={(e) => setFuelSystem(e.target.value)}
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="MaxSpeed">Max Speed (KM/H)</label>
                      <input
                        type="number"
                        name=""
                        id="MaxSpeed"
                        placeholder="(KM/H)"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={maxSpeed}
                        onChange={(e) => setMaxSpeed(parseInt(e.target.value))}
                      />
                    </div>
                  </section>

                  <h1 className="text-2xl font-bold text-center m-3">
                    Transmission
                  </h1>
                  <section className="grid grid-cols-12 col-span-12">
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="Gearbox">Transmission Type</label>

                      <select
                        name="transmission"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        id="vehicleTransmission"
                        aria-label="Default select example"
                        required
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                      >
                        <option selected value="">
                          Select Transmission
                        </option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="Gearbox">Gearbox (speed)</label>
                      <input
                        type="number"
                        name=""
                        id="Gearbox"
                        placeholder="Gearbox (speed)"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={gearBox}
                        onChange={(e) => setGearBox(parseInt(e.target.value))}
                      />
                    </div>
                  </section>

                  <h1 className="text-2xl font-bold text-center m-3">
                    Steering
                  </h1>
                  <section className="grid grid-cols-12 col-span-12">
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="Steering">Steering Type</label>

                      <input
                        type="text"
                        name=""
                        id="Steering"
                        placeholder="Steering Type"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={steeringType}
                        onChange={(e) => setSteeringType(e.target.value)}
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="PowerAssisted">Power Assisted</label>
                      <input
                        type="text"
                        name=""
                        id="PowerAssisted"
                        placeholder="Power Assisted"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={powerAssisted}
                        onChange={(e) => setPowerAssisted(e.target.value)}
                      />
                    </div>
                  </section>

                  <h1 className="text-2xl font-bold text-center m-3">
                    Suspension & Brakes
                  </h1>
                  <section className="grid grid-cols-12 col-span-12">
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="FrontSuspension">Front Suspension</label>

                      <input
                        type="text"
                        name=""
                        id="FrontSuspension"
                        placeholder="Front Suspension"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={frontSuspension}
                        onChange={(e) => setFrontSuspension(e.target.value)}
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="FrontBrakes">Front Brakes</label>
                      <input
                        type="text"
                        name=""
                        id="FrontBrakes"
                        placeholder="Front Brakes"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={frontBrakes}
                        onChange={(e) => setFrontBrakes(e.target.value)}
                      />
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="RearSuspension">Rear Suspension</label>

                      <input
                        type="text"
                        name=""
                        id="RearSuspension"
                        placeholder="Rear Suspension"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={rearSuspension}
                        onChange={(e) => setRearSuspension(e.target.value)}
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="RearBrakes">Rear Brakes</label>
                      <input
                        type="text"
                        name=""
                        id="RearBrakes"
                        placeholder="Rear Brakes"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={rearBrakes}
                        onChange={(e) => setRearBrakes(e.target.value)}
                      />
                    </div>
                  </section>

                  <h1 className="text-2xl font-bold text-center m-3">
                    Wheels and Tyres
                  </h1>
                  <section className="grid grid-cols-12 col-span-12">
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="WheelType">Wheel Type</label>

                      <input
                        type="text"
                        name=""
                        id="WheelType"
                        placeholder="Wheel Type"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={wheelType}
                        onChange={(e) => setWheelType(e.target.value)}
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="WheelSize">Wheel Size (inch)</label>

                      <input
                        type="number"
                        name=""
                        id="WheelSize"
                        placeholder="Wheel Size (inch)"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={wheelSize}
                        onChange={(e) => setWheelSize(parseInt(e.target.value))}
                      />
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="SpareTyre">Spare Tyre</label>

                      <select
                        id="SpareTyre"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={spareTyre}
                        onChange={(e) => setSpareTyre(e.target.value)}
                      >
                        <option selected>Spare Tyre</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="SpareTyreSize">
                        Spare Tyre Size (inch)
                      </label>

                      <input
                        type="number"
                        name=""
                        id="SpareTyreSize"
                        placeholder="Spare Tyre Size (inch)"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={spareTyreSize}
                        onChange={(e) =>
                          setSpareTyreSize(parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="TyreSize">Tyre Size</label>

                      <input
                        type="number"
                        name=""
                        id="TyreSize"
                        placeholder="Tyre Size (Width)"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={tyreSizeWidth}
                        onChange={(e) =>
                          setTyreSizeWidth(parseInt(e.target.value))
                        }
                      />
                      <input
                        type="number"
                        name=""
                        id="TyreSize"
                        placeholder="Tyre Size (Ratio)"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={tyreSizeRatio}
                        onChange={(e) =>
                          setTyreSizeRatio(parseInt(e.target.value))
                        }
                      />
                      <input
                        type="text"
                        name=""
                        id="TyreSize"
                        placeholder="Tyre Size (Diameter)"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={tyreSizeDiameter}
                        onChange={(e) => setTyreSizeDiameter(e.target.value)}
                      />
                    </div>
                  </section>
                  <h1 className="text-2xl font-bold text-center m-3">
                    Fuel Economy
                  </h1>
                  <section className="grid grid-cols-12 col-span-12">
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="FuelTankCapacity">
                        Fuel Tank Capacity (L)
                      </label>

                      <input
                        type="text"
                        name=""
                        id="FuelTankCapacity"
                        placeholder="Fuel Tank Capacity (L)"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={fuelTankCapacity}
                        onChange={(e) => setFuelTankCapacity(e.target.value)}
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="MileageCity">Mileage City (KM/L)</label>

                      <input
                        type="text"
                        name=""
                        id="MileageCity"
                        placeholder="Mileage City (KM/L)"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={mileageCity}
                        onChange={(e) => setMileageCity(e.target.value)}
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="MileageHighway">
                        Mileage Highway (KM/L)
                      </label>

                      <input
                        type="text"
                        name=""
                        id="MileageHighway"
                        placeholder="Mileage Highway (KM/L)"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={mileageHighway}
                        onChange={(e) => setMileageHighway(e.target.value)}
                      />
                    </div>
                  </section>

                  <h1 className="text-2xl font-bold text-center m-3">
                    Features
                  </h1>
                  <section className="grid grid-cols-12">
                    <div className="xl:col-span-12 max-xl:col-span-12 max-md:col-span-12 m-2">
                      <h3 className="font-bold text-center">
                        <u>Safety</u>
                      </h3>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="Airbags">No. of Airbags</label>
                      <select
                        id="Airbags"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={airbags}
                        onChange={(e) => setAirBags(e.target.value)}
                      >
                        {seats?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="Seatbelts">No. of Seatbelts</label>
                      <select
                        id="Seatbelts"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={seatbelts}
                        onChange={(e) => setSeatbelts(e.target.value)}
                      >
                        {seats?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="featurecheck">
                        Speed Sensing Auto Door Lock
                      </label>
                      <select
                        id="SpeedSensingAutoDoorLock"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={speedSensingDoorLock}
                        onChange={(e) =>
                          setSpeedSensingDoorLock(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="AntiTheftAlarmSystem">
                        Anti-Theft Alarm System
                      </label>
                      <select
                        id="AntiTheftAlarmSystem"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={antiTheftAlarmSystem}
                        onChange={(e) =>
                          setAntiTheftAlarmSystem(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="DriverSeatBeltWarning">
                        Driver Seat Belt Warning
                      </label>
                      <select
                        id="DriverSeatBeltWarning"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={driverSeatBeltWarning}
                        onChange={(e) =>
                          setDriverSeatBeltWarning(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="DownHillAssistControl">
                        Down Hill Assist Control
                      </label>
                      <select
                        id="DownHillAssistControl"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={downHillAssistControl}
                        onChange={(e) =>
                          setDownHillAssistControl(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="PassengerSeatBeltWarning">
                        Passenger Seat Belt Warning
                      </label>
                      <select
                        id="PassengerSeatBeltWarning"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={passengerSeatBeltWarning}
                        onChange={(e) =>
                          setPassengerSeatBeltWarning(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="HillStartAssistControl">
                        Hill Start Assist Control
                      </label>
                      <select
                        id="HillStartAssistControl"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={hillStartAssistControl}
                        onChange={(e) =>
                          setHillStartAssistControl(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="HillStartAssistControl">
                        Hill Start Assist Control
                      </label>
                      <select
                        id="HillStartAssistControl"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={hillStartAssistControl}
                        onChange={(e) =>
                          setHillStartAssistControl(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="Immobilizer">Immobilizer</label>
                      <select
                        id="Immobilizer"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={immobilizer}
                        onChange={(e) => setImmobilizer(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="TractionControl">Traction Control</label>
                      <select
                        id="TractionControl"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={tractionControl}
                        onChange={(e) => setTractionControl(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="VehicleStabilityControl">
                        Vehicle Stability Control
                      </label>
                      <select
                        id="VehicleStabilityControl"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={vehicleStabilityControl}
                        onChange={(e) =>
                          setVehicleStabilityControl(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="BlindSpotDetection">
                        BlindSpot Detection (BSD)
                      </label>
                      <select
                        id="BlindSpotDetection"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={blindSpotDetection}
                        onChange={(e) => setBlindSpotDetection(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="AntiLockBrakingSystem">
                        Anti-Lock Braking System (ABS)
                      </label>
                      <select
                        id="AntiLockBrakingSystem"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={antiLockBrakingSystem}
                        onChange={(e) =>
                          setAntiLockBrakingSystem(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="DoorOpeningWarning">
                        Door Opening Warning
                      </label>
                      <select
                        id="DoorOpeningWarning"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={doorOpeningWarning}
                        onChange={(e) => setDoorOpeningWarning(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="LaneKeepAssistSystem">
                        Lane Keep Assist System (LKAS)
                      </label>
                      <select
                        id="LaneKeepAssistSystem"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={laneKeepAssistSystem}
                        onChange={(e) =>
                          setLaneKeepAssistSystem(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="ElectronicBrakeForceDistribution">
                        Electronic Brake-Force Distribution (EBD)
                      </label>
                      <select
                        id="ElectronicBrakeForceDistribution"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={electricBrakeForce}
                        onChange={(e) => setElectricBrakeForce(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="AutonomousEmergencyBraking">
                        Autonomous Emergency Braking (AEB)
                      </label>
                      <select
                        id="AutonomousEmergencyBraking"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={autonomousEmergencyBraking}
                        onChange={(e) =>
                          setAutonomousEmergencyBraking(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="xl:col-span-12 max-xl:col-span-12 max-md:col-span-12 m-2">
                      <h3 className="font-bold text-center">
                        <u>Exterior</u>
                      </h3>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="AlloyWheels">Alloy Wheels</label>
                      <select
                        id="AlloyWheels"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={alloyWheels}
                        onChange={(e) => setAlloyWheels(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="AdjustableHeadlights">
                        Adjustable Headlights
                      </label>
                      <select
                        id="AdjustableHeadlights"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={adjustableHeadlights}
                        onChange={(e) =>
                          setAdjustableHeadlights(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="RearSpoiler">Rear Spoiler</label>
                      <select
                        id="RearSpoiler"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={rearSpoiler}
                        onChange={(e) => setRearSpoiler(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="SideMirrorswithIndicators">
                        Side Mirrors with Indicators
                      </label>
                      <select
                        id="SideMirrorswithIndicators"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={sideMirrorIndicators}
                        onChange={(e) =>
                          setSideMirrorIndicators(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="SunRoof">Sun Roof</label>
                      <select
                        id="SunRoof"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={sunRoof}
                        onChange={(e) => setSunRoof(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="Panaromic">Panaromic</label>
                      <select
                        id="Panaromic"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={panaromic}
                        onChange={(e) => setPanaromic(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="FogLights">Fog Lights</label>
                      <select
                        id="FogLights"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={fogLights}
                        onChange={(e) => setFogLights(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="DRLs">DRLs</label>
                      <select
                        id="DRLs"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={DRLs}
                        onChange={(e) => setDRLs(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="RoofRails">Roof Rails</label>
                      <select
                        id="RoofRails"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={roofRails}
                        onChange={(e) => setRoofRails(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="SideSteps">Side Steps</label>
                      <select
                        id="SideSteps"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={sideSteps}
                        onChange={(e) => setSideSteps(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="DualExhaust">Dual Exhaust</label>
                      <select
                        id="DualExhaust"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={dualExhaust}
                        onChange={(e) => setDualExhaust(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="xl:col-span-12 max-xl:col-span-12 max-md:col-span-12 m-2">
                      <h3 className="font-bold text-center">
                        <u>Instrumentation</u>
                      </h3>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="Tachometer">Tachometer</label>
                      <select
                        id="Tachometer"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={tachometer}
                        onChange={(e) => setTachometer(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="MultiInfo">Multi Info</label>
                      <select
                        id="MultiInfo"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={multiInfo}
                        onChange={(e) => setMultiInfo(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="InformationCluster">
                        Information Cluster
                      </label>
                      <input
                        type="text"
                        name=""
                        id="InformationCluster"
                        placeholder="Information Cluster"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        // value={categoryName}
                        value={infoCluster}
                        onChange={(e) => setInfoCluster(e.target.value)}
                      />
                    </div>

                    <div className="xl:col-span-12 max-xl:col-span-12 max-md:col-span-12 m-2">
                      <h3 className="font-bold text-center">
                        <u>Infotainment</u>
                      </h3>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="DisplaySize">Display Size (inch)</label>
                      <input
                        type="number"
                        name=""
                        id="DisplaySize"
                        placeholder="Display Size (inch)"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        // value={categoryName}
                        value={displaySize}
                        onChange={(e) => setDisplaySize(e.target.value)}
                      />
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="USBandAuxillaryCable">
                        USB and Auxillary Cable
                      </label>
                      <select
                        id="USBandAuxillaryCable"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={usbAuxilaryCable}
                        onChange={(e) => setUSBAuxilaryCable(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="CDPlayer">CD Player</label>
                      <select
                        id="CDPlayer"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={cdPlayer}
                        onChange={(e) => setCDPlayer(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="DVDPlayer">DVD Player</label>
                      <select
                        id="DVDPlayer"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={dvdPlayer}
                        onChange={(e) => setDVDPlayer(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="NoofSpeakers">No. of Speakers</label>

                      <input
                        id="NoofSpeakers"
                        type="number"
                        placeholder="No. of Speakers"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={noOfSpeakers}
                        onChange={(e) => setNoOfSpeakers(e.target.value)}
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="FrontSpeakers">Front Speakers</label>
                      <select
                        id="FrontSpeakers"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={frontSpeakers}
                        onChange={(e) => setFrontSpeakers(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="RearSpeakers">Rear Speakers</label>
                      <select
                        id="RearSpeakers"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={rearSpeakers}
                        onChange={(e) => setRearSpeakers(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="RearSeatEntertainment">
                        Rear Seat Entertainment
                      </label>
                      <select
                        id="RearSeatEntertainment"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={rearSeatEntertainment}
                        onChange={(e) =>
                          setRearSeatEntertainment(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="VoiceControl">Voice Control</label>
                      <select
                        id="VoiceControl"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={voiceControl}
                        onChange={(e) => setVoiceControl(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="AndroidAuto">Android Auto</label>
                      <select
                        id="AndroidAuto"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={androidAuto}
                        onChange={(e) => setAndroidAuto(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="AppleCarPlay">Apple Car Play</label>
                      <select
                        id="AppleCarPlay"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={appleCarPlay}
                        onChange={(e) => setAppleCarPlay(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="xl:col-span-12 max-xl:col-span-12 max-md:col-span-12 m-2">
                      <h3 className="font-bold text-center">
                        <u>Comfort and Convenience</u>
                      </h3>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="SeatMaterialType">
                        Seat Material Type
                      </label>
                      <input
                        type="text"
                        name=""
                        id="SeatMaterialType"
                        placeholder="Seat Material Type"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        // value={categoryName}
                        value={seatMaterialType}
                        onChange={(e) => setSeatMaterialType(e.target.value)}
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="KeyType">Key Type</label>
                      <input
                        type="text"
                        name=""
                        id="KeyType"
                        placeholder="Key Type"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        // value={categoryName}
                        value={keyType}
                        onChange={(e) => setKeyType(e.target.value)}
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="AirConditioner">Air Conditioner</label>
                      <select
                        id="AirConditioner"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={airconditioning}
                        onChange={(e) => setAirConditioning(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="RainSensingWipers">
                        Rain Sensing Wipers
                      </label>
                      <select
                        id="RainSensingWipers"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={rainSensingWiper}
                        onChange={(e) => setRainSensingWiper(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="ClimateControl">Climate Control</label>
                      <select
                        id="ClimateControl"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={climateControl}
                        onChange={(e) => setClimateControl(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="CruiseControl">Cruise Control</label>
                      <select
                        id="CruiseControl"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={cruiseControl}
                        onChange={(e) => setCruiseControl(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="RearACVents">Rear AC Vents</label>
                      <select
                        id="RearACVents"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={rearACVents}
                        onChange={(e) => setRearACVents(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="DrivingModes">Driving Modes</label>
                      <select
                        id="DrivingModes"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={drivingModes}
                        onChange={(e) => setDrivingModes(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="PaddleShifter">Paddle Shifter</label>
                      <select
                        id="PaddleShifter"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={paddleShifter}
                        onChange={(e) => setPaddleShifter(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="Heater">Heater</label>
                      <select
                        id="Heater"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={heater}
                        onChange={(e) => setHeater(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="Heated Seats">Heated Seats</label>
                      <select
                        id="Heated Seats"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={heatedSeats}
                        onChange={(e) => setHeatedSeats(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="KeylessEntry">Keyless Entry</label>
                      <select
                        id="KeylessEntry"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={keylessEntry}
                        onChange={(e) => setKeylessEntry(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="PushStart">Push Start</label>
                      <select
                        id="PushStart"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={pushStart}
                        onChange={(e) => setPushStart(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="CoolBox">CoolBox</label>
                      <select
                        id="CoolBox"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={coolBox}
                        onChange={(e) => setCoolBox(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="RemoteEngineStart">
                        Remote Engine Start
                      </label>
                      <select
                        id="RemoteEngineStart"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={remoteEngineStart}
                        onChange={(e) => setRemoteEngineStart(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="Navigation">Navigation</label>
                      <select
                        id="Navigation"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={remoteEngineStart}
                        onChange={(e) => setRemoteEngineStart(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="CentralLocking">Central Locking</label>
                      <select
                        id="CentralLocking"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={centralLocking}
                        onChange={(e) => setCentralLocking(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="PowerDoorLocks">Power Door Locks</label>
                      <select
                        id="PowerDoorLocks"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={powerDoorLocks}
                        onChange={(e) => setPowerDoorLocks(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="FrontCamera">Front Camera</label>
                      <select
                        id="FrontCamera"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={frontCamera}
                        onChange={(e) => setFrontCamera(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="RearCamera">Rear Camera</label>
                      <select
                        id="RearCamera"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={rearCamera}
                        onChange={(e) => setRearCamera(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="360Camera">360 Camera</label>
                      <select
                        id="360Camera"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={Camera360}
                        onChange={(e) => setCamera360(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="PowerWindows">Power Windows</label>
                      <select
                        id="PowerWindows"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={powerWindows}
                        onChange={(e) => setPowerWindows(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="PowerMirrors">Power Mirrors</label>
                      <select
                        id="PowerMirrors"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={powerMirrors}
                        onChange={(e) => setPowerMirrors(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="AutoRetractableSideMirrors">
                        Auto Retractable Side Mirrors
                      </label>
                      <select
                        id="AutoRetractableSideMirrors"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={autoRetractableSideMirror}
                        onChange={(e) =>
                          setAutoRetractableSideMirror(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="FrontParkingSensors">
                        Front Parking Sensors
                      </label>
                      <select
                        id="FrontParkingSensors"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={frontParkingSensors}
                        onChange={(e) => setFrontParkingSensors(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="RearParkingSensors">
                        Rear Parking Sensors
                      </label>
                      <select
                        id="RearParkingSensors"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={rearParkingSensors}
                        onChange={(e) => setRearParkingSensors(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="ArmRest">Arm Rest</label>
                      <select
                        id="ArmRest"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={armRest}
                        onChange={(e) => setArmRest(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="RearFoldingSeat">Rear Folding Seat</label>
                      <select
                        id="RearFoldingSeat"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={rearFoldingSeat}
                        onChange={(e) => setRearFoldingSeat(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="Handbrake">Handbrake</label>

                      <input
                        id="Handbrake"
                        type="text"
                        placeholder="Handbrake"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={handBrake}
                        onChange={(e) => setHandBrake(e.target.value)}
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="RearHeadrest">Rear Headrest</label>
                      <select
                        id="RearHeadrest"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={rearHeadRest}
                        onChange={(e) => setRearHeadRest(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="AutoBrakeHold">Auto Brake Hold</label>
                      <select
                        id="AutoBrakeHold"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={autoBrakeHold}
                        onChange={(e) => setAutoBrakeHold(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="RearWiper">Rear Wiper</label>
                      <select
                        id="RearWiper"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={rearWiper}
                        onChange={(e) => setRearWiper(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="AutoParkingSystem">
                        Auto Parking System
                      </label>
                      <select
                        id="AutoParkingSystem"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={autoParkingSystem}
                        onChange={(e) => setAutoParkingSystem(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="DriverSeatElectricAdjustment">
                        Driver Seat Electric Adjustment
                      </label>
                      <select
                        id="SeatElectricAdjustment"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={driverSeatElectricAdjustment}
                        onChange={(e) =>
                          setDriverSeatElectricAdjustment(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="DriverSeatLumbarSupport">
                        Driver Seat Lumbar Support
                      </label>
                      <select
                        id="DriverSeatLumbarSupport"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={driverSeatLumbarSupport}
                        onChange={(e) =>
                          setDriverSeatLumbarSupport(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="DriverSeatMemoryFunction">
                        Driver Seat Memory Function
                      </label>
                      <select
                        id="DriverSeatMemoryFunction"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={driverSeatMemoryFunction}
                        onChange={(e) =>
                          setDriverSeatMemoryFunction(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="FrontPowerOutlet">
                        Front Power Outlet
                      </label>
                      <select
                        id="FrontPowerOutlet"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={frontPowerOutlet}
                        onChange={(e) => setFrontPowerOutlet(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="RearPowerOutlet">Rear Power Outlet</label>
                      <select
                        id="RearPowerOutlet"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={reartPowerOutlet}
                        onChange={(e) => setRearPowerOutlet(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="SteeringAdjustment">
                        Steering Adjustment
                      </label>
                      <select
                        id="SteeringAdjustment"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={steeringAdjustment}
                        onChange={(e) => setSteeringAdjustment(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="SteeringSwitches">
                        Steering Switches
                      </label>
                      <select
                        id="SteeringSwitches"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={steeringSwitches}
                        onChange={(e) => setSteeringSwitches(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="WirelessCharger">Wireless Charger</label>
                      <select
                        id="WirelessCharger"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={wirelessCharger}
                        onChange={(e) => setWirelessCharger(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="HeadlightOnReminder">
                        Headlight On Reminder
                      </label>
                      <select
                        id="HeadlightOnReminder"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={headlightReminder}
                        onChange={(e) => setHeadlightReminder(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="BossSeatSwitch">Boss Seat Switch</label>
                      <select
                        id="BossSeatSwitch"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={bossSeatSwitch}
                        onChange={(e) => setBossSeatSwitch(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="AutomaticHeadLamps">
                        Automatic Head Lamps
                      </label>
                      <select
                        id="AutomaticHeadLamps"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={automaticHeadLamps}
                        onChange={(e) => setAutomaticHeadLamps(e.target.value)}
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="TyrePressureMonitoringSystem">
                        Tyre Pressure Monitoring System (TPMS)
                      </label>
                      <select
                        id="TyrePressureMonitoringSystem"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={tyrePressureMonitoringSystem}
                        onChange={(e) =>
                          setTyrePressureMonitoringSystem(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="PassengerSeatElectricAdjustment">
                        Passenger Seat Electric Adjustment
                      </label>
                      <select
                        id="PassengerSeatElectricAdjustment"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={passengerSeatElectricAdjustment}
                        onChange={(e) =>
                          setPassengerSeatElectricAdjustment(e.target.value)
                        }
                      >
                        {featureSelection?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </section>

                  <section className="flex justify-center items-center">
                    {submitting ? (
                      <button
                        type="button"
                        className="bg-gray-500 px-4 py-2 cursor-not-allowed rounded text-white mt-2 text-sm"
                      >
                        Submitting ...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="bg-red-500 px-4 py-2 rounded text-white mt-2 text-sm"
                      >
                        {postDisabled ? "Complete to continue" : "Submit"}
                      </button>
                    )}{" "}
                  </section>
                </form>
              </main>
            </div>
          </div>
        </section>
      </section>
    </PrivateRoute>
  );
};

export default index;
