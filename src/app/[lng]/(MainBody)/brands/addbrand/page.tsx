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

const addbrand = () => {
  const router = useRouter();
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);

  const [submitting, setSubmitting] = useState(false);

  const [updateToken, setUpdateToken] = useState("");

  const [postToken, setPostToken] = useState("");

  // features
  const [modelName, setModelName] = useState("");

  // features

  const generateToken = () => {
    const newToken = uuidv4().replace(/-/g, "").slice(0, 12);
    setPostToken(newToken);
  };

  const fetchBrands = async () => {
    const res = await axios.get(`${BASE_URL}/brand-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const {
    data: BrandList,
    error: makeError,
    isLoading: makeLoading,
  } = useQuery("myBrands", fetchBrands);

  const token = localStorage.getItem("authToken");

  const fetchMake = async () => {
    const res = await axios.get(`${BASE_URL}/byMake`, {
      params: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
  };

  const [centred, setCentered] = useState(false);

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
                  onChange={(e: any) => setModelName(e.target.value)}
                  value={modelName}
                >
                  <option value="" disabled>
                    Select Mode
                  </option>
                  {BrandList?.map((brand: any) => (
                    <option key={brand?.brand_id} value={brand?.brand_id}>
                      {brand.brand_name}
                    </option>
                  ))}
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

export default addbrand;
