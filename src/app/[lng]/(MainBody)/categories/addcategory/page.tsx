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
  filename: string; // Adjust the type based on your actual data structure
  // Add other properties as needed
}

const addcategory = () => {
  const router = useRouter();
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);

  const [submitting, setSubmitting] = useState(false);

  const [updateToken, setUpdateToken] = useState("");

  const [postToken, setPostToken] = useState("");

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
  const [batteryType, setBatteryType] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [chargingtime, setChargingtime] = useState("");
  const [range, setRange] = useState("");
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
  const [seatMaterialType, setSeatMaterialType] = useState("");
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

  const [coverImage, setCoverImage] = useState("-");
  const [color, setColor] = useState("");
  const [colorCodes, setColorCodes] = useState("");
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
  const [launchDate, setLaunchDate] = useState<any>(new Date());
  const [makeName, setMakeName] = useState("");
  const [vehicleColour, setVehicleColour] = useState("");
  const [startingAmount, setStartingAmount] = useState("");
  const [prevImg, setPrevImg] = useState<any>("");
  const [imageApi, setImageApi] = useState(true);
  const postDisabled = imageApi === false;
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

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
  const [getUpdate, setGetUpdate] = useState(false);

  const [imagesPath, setImagesPath] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [files, setFiles] = useState<any[]>([]);
  const [moreImages, setMoreImages] = useState<any[]>([]);
  const [id, setId] = useState<string | null>(null);

  // for parsing data

  const [dimensionsObj, setDimensionsObj] = useState<object | any>({});
  const [engineMotor, setEngineMotor] = useState<object | any>({});
  const [transmissionObj, setTransmissionObj] = useState<object | any>({});
  const [steering, setSteering] = useState<object | any>({});
  const [suspension, setsuspension] = useState<object | any>({});
  const [wheelTyre, setWheelTyre] = useState<object | any>({});
  const [fuelEconomy, setFuelEconomy] = useState<object | any>({});
  const [safety, setSafety] = useState<object | any>({});
  const [exterior, setExterior] = useState<object | any>({});
  const [instrument, setInstrument] = useState<object | any>({});
  const [info, setInfo] = useState<object | any>({});
  const [comfort, setComfort] = useState<object | any>({});

  const generateToken = () => {
    const newToken = uuidv4().replace(/-/g, "").slice(0, 12);
    setPostToken(newToken);
  };

  const getPostDetil = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/newcarpostdetails`, {
        params: {
          newcarpost_id: id,
        },
      });
      setMakeName(response?.data?.data?.make);
      setDescription(response?.data?.data?.newcarpost_overview);

      setUpdateToken(response?.data?.data?.newcarpost_token);
      setDimensionsObj(JSON.parse(response?.data?.data?.newcarpost_dimensions));
      setEngineMotor(JSON.parse(response?.data?.data?.newcarpost_enginemotor));
      setTransmissionObj(
        JSON.parse(response?.data?.data?.newcarpost_transmission)
      );
      setSteering(JSON.parse(response?.data?.data?.newcarpost_steering));
      setsuspension(
        JSON.parse(response?.data?.data?.newcarpost_suspensionbrakes)
      );
      setWheelTyre(JSON.parse(response?.data?.data?.newcarpost_wheeltyres));
      setFuelEconomy(JSON.parse(response?.data?.data?.newcarpost_fueleconomy));
      setSafety(JSON.parse(response?.data?.data?.newcarpost_safety));
      setExterior(JSON.parse(response?.data?.data?.newcarpost_exterior));
      setInstrument(
        JSON.parse(response?.data?.data?.newcarpost_instrumentation)
      );
      setInfo(JSON.parse(response?.data?.data?.newcarpost_Infotainment));
      setComfort(
        JSON.parse(response?.data?.data?.newcarpost_comfortconvenience)
      );

      setModelName(response?.data?.data?.model_id);
      setYearName(response?.data?.data?.year_id);
      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: carData,
    error: carError,
    isLoading: carLoading,
  } = useQuery(`getCarData${id}`, getPostDetil, {
    enabled: !!id, // Set enabled to false initially
  });

  const getPostImages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/postimages`, {
        params: {
          post_id: updateToken || postToken,
        },
      });

      setUploadedImages(response?.data?.images);
      setMoreImages(response?.data?.images);
      setImagesPath(response?.data?.imagepath);

      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: newImages,
    error: imgError,
    isLoading: imgLoading,
  } = useQuery(`getCarImgs_${getUpdate}`, getPostImages, {
    enabled: !!updateToken,
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
    if (!id) {
      generateToken();
    }
  }, []);

  function formatDate(dateString: any) {
    const parts = dateString?.match(/(\d+)-(\d+)-(\d+)/);

    if (!parts) {
      // Handle invalid format
      return null; // Or throw an error, depending on your use case
    }

    const [, year, month, day] = parts;

    setLaunchDate(new Date(year, month - 1, day));

    return new Date(year, month - 1, day);
  }

  useEffect(() => {
    setMakeId(carData?.make_id);
    setModelName(carData?.model_id);
    setYearName(carData?.year_id);
    setVarient(carData?.newcarpost_variants);
    setColor(carData?.newcarpost_color);
    setColorCodes(carData?.color_codes);
    setBodytype(carData?.newcarpost_bodytype);
    // setDescription(carData?.newcarpost_overview);
    setExfactoryPrice(carData?.newcarpost_price);

    formatDate(carData?.newcarpost_date);

    //// dimensions

    setOverallLength(dimensionsObj?.overallLength);
    setKerbWeight(dimensionsObj?.kerbWeight);
    setOverallWidth(dimensionsObj?.overallWidth);
    setBootSpaceL(dimensionsObj?.bootSpaceL);
    setWheelBase(dimensionsObj?.wheelBase);
    setNoOfDoors(dimensionsObj?.noOfDoors);
    setGroundClearance(dimensionsObj?.groundClearance);
    setSeatingCapacity(dimensionsObj?.seatingCapacity);

    // engine / motor

    setEngineType(engineMotor?.engineType);
    setBatteryType(engineMotor?.batteryType);
    setBatteryCapacity(engineMotor?.batteryCapacity);
    setChargingtime(engineMotor?.chargingtime);
    setRange(engineMotor?.range);
    setTurboCharger(engineMotor?.turboCharger);
    setDisplacement(engineMotor?.displacement);
    setNoOfCylinders(engineMotor?.noOfCylinders);
    setHorsePower(engineMotor?.horsePower);
    setRPM(engineMotor?.rpm);
    setValvesPerCylinder(engineMotor?.valvesPerCylinder);
    setFuelSystem(engineMotor?.fuelSystem);
    setMaxSpeed(engineMotor?.maxSpeed);

    // transmission

    setTransmission(transmissionObj?.transmission);
    setGearBox(transmissionObj?.gearBox);

    // steering

    setSteeringType(steering?.steeringType);
    setPowerAssisted(steering?.powerAssisted);

    // suspension

    setFrontSuspension(suspension?.frontSuspension);
    setFrontBrakes(suspension?.frontBrakes);
    setRearSuspension(suspension?.rearSuspension);
    setRearBrakes(suspension?.rearBrakes);

    // wheel tyre

    setWheelType(wheelTyre?.wheelType);
    setWheelSize(wheelTyre?.wheelSize);
    setSpareTyre(wheelTyre?.spareTyre);
    setSpareTyreSize(wheelTyre?.spareTyreSize);
    setTyreSizeWidth(wheelTyre?.tyreSizeWidth);
    setTyreSizeRatio(wheelTyre?.tyreSizeRatio);
    setTyreSizeDiameter(wheelTyre?.tyreSizeDiameter);

    // fuel economy

    setFuelTankCapacity(fuelEconomy?.fuelTankCapacity);
    setMileageCity(fuelEconomy?.mileageCity);
    setMileageHighway(fuelEconomy?.mileageHighway);

    // safety

    setAirBags(safety?.airbags);
    setSeatbelts(safety?.seatbelts);
    setSpeedSensingDoorLock(safety?.speedSensingDoorLock);
    setAntiTheftAlarmSystem(safety?.antiTheftAlarmSystem);
    setDriverSeatBeltWarning(safety?.driverSeatBeltWarning);
    setDownHillAssistControl(safety?.downHillAssistControl);
    setPassengerSeatBeltWarning(safety?.passengerSeatBeltWarning);
    setHillStartAssistControl(safety?.hillStartAssistControl);
    setImmobilizer(safety?.immobilizer);
    setTractionControl(safety?.tractionControl);
    setVehicleStabilityControl(safety?.vehicleStabilityControl);
    setBlindSpotDetection(safety?.blindSpotDetection);
    setAntiLockBrakingSystem(safety?.antiLockBrakingSystem);
    setDoorOpeningWarning(safety?.doorOpeningWarning);
    setLaneKeepAssistSystem(safety?.laneKeepAssistSystem);
    setElectricBrakeForce(safety?.electricBrakeForce);
    setAutonomousEmergencyBraking(safety?.autonomousEmergencyBraking);

    // exterior

    setAlloyWheels(exterior?.alloyWheels);
    setAdjustableHeadlights(exterior?.adjustableHeadlights);
    setRearSpoiler(exterior?.rearSpoiler);
    setSideMirrorIndicators(exterior?.sideMirrorIndicators);
    setSunRoof(exterior?.sunRoof);
    setPanaromic(exterior?.panaromic);
    setFogLights(exterior?.fogLights);
    setDRLs(exterior?.DRLs);
    setRoofRails(exterior?.roofRails);
    setSideSteps(exterior?.sideSteps);
    setDualExhaust(exterior?.dualExhaust);

    // Instrumentation
    setTachometer(instrument?.tachometer);
    setMultiInfo(instrument?.multiInfo);
    setInfoCluster(instrument?.infoCluster);

    // Infotainment

    setDisplaySize(info?.displaySize);
    setUSBAuxilaryCable(info?.usbAuxilaryCable);
    setCDPlayer(info?.cdPlayer);
    setDVDPlayer(info?.dvdPlayer);
    setNoOfSpeakers(info?.noOfSpeakers);
    setFrontSpeakers(info?.frontSpeakers);
    setRearSpeakers(info?.rearSpeakers);
    setRearSeatEntertainment(info?.rearSeatEntertainment);
    setVoiceControl(info?.voiceControl);
    setAndroidAuto(info?.androidAuto);
    setAppleCarPlay(info?.appleCarPlay);

    // comfort

    setSeatMaterialType(comfort?.seatMaterialType);
    setKeyType(comfort?.keyType);
    setAirConditioning(comfort?.airconditioning);
    setRainSensingWiper(comfort?.rainSensingWiper);
    setClimateControl(comfort?.climateControl);
    setCruiseControl(comfort?.cruiseControl);
    setRearACVents(comfort?.rearACVents);
    setDrivingModes(comfort?.drivingModes);
    setPaddleShifter(comfort?.paddleShifter);
    setHeater(comfort?.heater);
    setHeatedSeats(comfort?.heatedSeats);
    setKeylessEntry(comfort?.keylessEntry);
    setPushStart(comfort?.pushStart);
    setCoolBox(comfort?.coolBox);
    setRemoteEngineStart(comfort?.remoteEngineStart);
    setNavigation(comfort?.navigation);
    setCentralLocking(comfort?.centralLocking);
    setPowerDoorLocks(comfort?.powerDoorLocks);
    setFrontCamera(comfort?.frontCamera);
    setRearCamera(comfort?.rearCamera);
    setCamera360(comfort?.Camera360);
    setPowerWindows(comfort?.powerWindows);
    setPowerMirrors(comfort?.powerMirrors);
    setAutoRetractableSideMirror(comfort?.autoRetractableSideMirror);
    setFrontParkingSensors(comfort?.frontParkingSensors);
    setRearParkingSensors(comfort?.rearParkingSensors);
    setArmRest(comfort?.armRest);
    setRearFoldingSeat(comfort?.rearFoldingSeat);
    setHandBrake(comfort?.handBrake);
    setRearHeadRest(comfort?.rearHeadRest);
    setAutoBrakeHold(comfort?.autoBrakeHold);
    setRearWiper(comfort?.rearWiper);
    setAutoParkingSystem(comfort?.autoParkingSystem);
    setDriverSeatElectricAdjustment(comfort?.driverSeatElectricAdjustment);
    setDriverSeatLumbarSupport(comfort?.driverSeatLumbarSupport);
    setDriverSeatMemoryFunction(comfort?.driverSeatMemoryFunction);
    setFrontPowerOutlet(comfort?.frontPowerOutlet);
    setRearPowerOutlet(comfort?.reartPowerOutlet);
    setSteeringAdjustment(comfort?.steeringAdjustment);
    setSteeringSwitches(comfort?.steeringSwitches);
    setWirelessCharger(comfort?.wirelessCharger);
    setHeadlightReminder(comfort?.headlightReminder);
    setBossSeatSwitch(comfort?.bossSeatSwitch);
    setAutomaticHeadLamps(comfort?.automaticHeadLamps);
    setTyrePressureMonitoringSystem(comfort?.tyrePressureMonitoringSystem);
    setPassengerSeatElectricAdjustment(
      comfort?.passengerSeatElectricAdjustment
    );
  }, [carData]);

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
    batteryType,
    batteryCapacity,
    chargingtime,
    range,

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

    // const formData = new FormData()
    // formData.append("post_id",updateToken ? updateToken : postToken)
    // formData.append("filename",name)

    files.splice(index, 1);
    setFiles([...files]);

    // uploadedImages.splice(index, 1);
    // setUploadedImages([...uploadedImages]);

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
    // setModelName("")
    // setYearName("")

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
  } = useQuery(`myYear_${modelName}`, fetchModelYear, {
    enabled: !!modelName, // Set enabled to false initially
  });

  const fetchVariant = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getVarientList`, {
        params: {
          modelId: modelName,
          yearId: yearName,
        },
      });

      // setVariantList(response.data);
      return response?.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const {
    data: variants,
    error: variantError,
    isLoading: variantLoading,
  } = useQuery(`myVariants_${modelName}${makeName}${yearName}`, fetchVariant, {
    enabled: !!yearName, // Set enabled to false initially
  });

  const seats = [
    {
      title: "0",
      value: "0",
    },
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
    {
      title: "16",
      value: "16",
    },
    {
      title: "17",
      value: "17",
    },
    {
      title: "18",
      value: "18",
    },
    {
      title: "19",
      value: "19",
    },
    {
      title: "20",
      value: "20",
    },
  ];

  const featureSelection = [
    {
      title: "false",
      value: "false",
    },
    {
      title: "true",
      value: "true",
    },
  ];

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (files.length !== 0 || uploadedImages.length !== 0) {
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
      formData.append(
        `newcarpost_token`,
        updateToken ? updateToken : postToken
      );
      formData.append(`newcarpost_launchdate`, launchDate);
      formData.append(`make_id`, makeId);
      formData.append(`model_id`, modelName);
      formData.append(`year_id`, yearName);
      formData.append(`newcarpost_price`, `${exFactoryPrice}`);
      formData.append(`newcarpost_color`, `${color}`);
      formData.append(`color_codes`, `${colorCodes}`);
      formData.append(`newcarpost_bodytype`, `${bodyType}`);
      formData.append(`newcarpost_variants`, `${varient}`);
      formData.append(`newcarpost_overview`, `${description}`);
      formData.append(`bodytype_id`, `${bodyType}`);
      if (id) {
        formData.append(`newcarpost_id`, `${id}`);
      }

      if (uploadedImages.length !== 0) {
        moreImages.forEach((image: any) => {
          formData.append(`imageFiles[]`, image.filename);
        });
      }

      if (files.length !== 0) {
        newFiles.forEach((image: any) => {
          formData.append(`imageFiles[]`, image);
        });
      }

      setSubmitting(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/${
            updateToken ? "savenewcarpostupdate" : "savenewcarpost"
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
        router.push(`/${i18LangStatus}/new_car/carpostlist`);
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

  return (
    <>
      {submitting ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <h1 className="faq-title">Basic Information</h1>

          <CommonModal
            centered
            isOpen={centred}
            toggle={centeredToggle}
            size="md"
          >
            <div className="modal-toggle-wrapper">
              {updateToken ? (
                <img
                  src={`${BASE_URL}/public/posts/${updateToken}/${carData?.newcarpost_cover}`}
                  alt="cover-image"
                  className="img-fluid"
                />
              ) : (
                <img src={prevImg} alt="cover-image" className="img-fluid" />
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
            <Col lg="12" md="6">
              <FormGroup>
                <Label>Category Name</Label>
                <Input
                  required
                  name="model"
                  type="text"
                  placeholder="Type category name"
                  className="form-control form-select"
                  onChange={(e: any) => setModelName(e.target.value)}
                  value={modelName}
                >
                </Input>
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
