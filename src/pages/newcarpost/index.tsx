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

const index = () => {
  // api url
  const url = `${process.env.API_URL}`;

  const token = localStorage.getItem("authToken");

  const [submitting, setSubmitting] = useState(false);

  const [auctionDate, setAuctionDate] = useState("");
  const [makeId, setMakeId] = useState("");
  const [modelName, setModelName] = useState("");
  const [yearName, setYearName] = useState("");
  const [registeredIn, setRegisteredIn] = useState("");
  const [transmission, setTransmission] = useState("");
  const [vehicleCondition, setVehicleCondition] = useState("");
  const [vehicleFuel, setVehicleFuel] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [title, setTitle] = useState("");
  const [cityName, setCityName] = useState("");
  const [mileage, setMileage] = useState("");
  const [price, setPrice] = useState<number | undefined>();
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("");
  const [randomString, setRandomString] = useState("");
  const [description, setDescription] = useState("");
  const [makeName, setMakeName] = useState("");
  const [vehicleColour, setVehicleColour] = useState("");
  const [startingAmount, setStartingAmount] = useState("");
  const [prevImg, setPrevImg] = useState<File[]>([]);

  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  const [userData, setUserData] = useState({});

  const name = userData?.name;
  const email = userData?.email;

  // features

  const [abs, setABS] = useState(false);
  const [airbags, setAirBags] = useState(false);
  const [airconditioning, setAirConditioning] = useState(false);
  const [fm, setFM] = useState(false);
  const [cassettePlayer, setCassettePlayer] = useState(false);
  const [cdPlayer, setCDPlayer] = useState(false);
  const [dvdPlayer, setDVDPlayer] = useState(false);
  const [climateControl, setClimateControl] = useState(false);
  const [frontCamera, setFrontCamera] = useState(false);
  const [frontSpeakers, setFrontSpeakers] = useState(false);
  const [heatedSeats, setHeatedSeats] = useState(false);
  const [immobilizerKey, setImmobilizerKey] = useState(false);
  const [keylessEntry, setKeylessEntry] = useState(false);
  const [navigationSystem, setNavigationSystem] = useState(false);
  const [powerLocks, setPowerLocks] = useState(false);
  const [powerMirrors, setPowerMirrors] = useState(false);
  const [powerSteering, setPowerSteering] = useState(false);
  const [powerWindows, setPowerWindows] = useState(false);
  const [rearACVents, setRearACVents] = useState(false);
  const [rearCamera, setRearCamera] = useState(false);
  const [rearSeatEntertainment, setRearSeatEntertainment] = useState(false);
  const [rearSpeakers, setRearSpeakers] = useState(false);
  const [steeringSwitches, setSteeringSwitches] = useState(false);
  const [sunRoof, setSunRoof] = useState(false);
  const [usb, setUSB] = useState(false);
  const [alloyRims, setAlloyRims] = useState(false);
  const [assembly, setAssembly] = useState("Local");

  const postData = {
    name: name,
    email: email,
    title,
    cityName,
    vehicleColour,
    milage: mileage,
    price,
    phone: userData?.phone,
    description,
    makeName,
    modelName,
    yearName,
    registeredIn,
    transmission,
    vehicleCondition,
    vehicleFuel,
    categoryName,
    typeName: "Auction Ads",

    carFeatures: JSON.stringify({
      abs: abs,
      air_bags: airbags,
      air_conditioning: airconditioning,
      am_fm_radio: fm,
      cassette_player: cassettePlayer,
      cd_player: cdPlayer,
      climate_control: climateControl,
      front_camera: frontCamera,
      front_speakers: frontSpeakers,
      heated_seats: heatedSeats,
      immobilizer_key: immobilizerKey,
      keyless_entry: keylessEntry,
      navigation_system: navigationSystem,
      power_locks: powerLocks,
      power_mirrors: powerMirrors,
      power_steering: powerSteering,
      power_windows: powerWindows,
      rear_ac_vents: rearACVents,
      rear_camera: rearCamera,
      rear_seat_entertainment: rearSeatEntertainment,
      rear_speakers: rearSpeakers,
      steering_switches: steeringSwitches,
      sun_roof: sunRoof,
      usb_and_auxillary_cable: usb,
      alloy_rims: alloyRims,
    }),
  };

  const jsonEncodedUserData = JSON.stringify(userData);
  const jsonEncodedPostData = JSON.stringify(postData);

  const fetchCities = async () => {
    const res = await axios.get(`${url}/cities`, {
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
    const res = await axios.get(`${url}/getMake`, {
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
    const res = await axios.get(`${url}/getByMakeId`, {
      params: {
        makeId: makeId,
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
  } = useQuery(`myMakeById`, fetchMakeById, {
    enabled: !!makeId, // Set enabled to false initially
  });

  const fetchModelYear = async () => {
    const res = await axios.get(`${url}/getModelYear`, {
      params: {
        makeId,
      },
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
  };

  const handleImageDelete = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    // if (newImages.length === 0) {
    //   setImageErrorMessage("");
    // }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    // const jsonEncodedUserData = JSON.stringify(userData);
    // const jsonEncodedPostData = JSON.stringify(postData);

    if (prevImg.length === 0) {
      toast.error("Images are required");
    } else {
      prevImg.forEach((file) => {
        formData.append("imageFiles", file);
      });

      formData.append("userData", `${jsonEncodedUserData}`);
      formData.append("postData", `${jsonEncodedPostData}`);
      formData.append("auctionStartTime", selectedStartTime);
      formData.append("auctionEndTime", selectedEndTime);
      formData.append("startingAmount", startingAmount);
      formData.append("auctionDate", auctionDate);

      setSubmitting(true);
      try {
        const response = await axios.post(
          `${url}/createAuctionPost`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success(response?.data);
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

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUserData((prevFormData) => ({
      ...prevFormData,
      roleName: "ROLE_AUCTIONEER",
      password: "randomString",
      [name]: value,
    }));
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
        (price / 100000).toLocaleString("en-US", { maximumFractionDigits: 2 }) +
        " lacs"
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
      title: "True",
      value: "true",
    },
    {
      title: "False",
      value: "false",
    },
  ];

  return (
    <PrivateRoute requiredRoles={["ROLE_BIDDER", "Admin"]}>
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
                        required
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
                            <option key={t.mmodelId} value={t.modelName}>
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
                            <option key={t.yearId} value={t.year}>
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
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                      >
                        <option selected value="">
                          Select Body Type
                        </option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="Color">Color</label>

                      <input
                        type="text"
                        placeholder="Vehicle Color"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        onChange={(e) => setVehicleColour(e.target.value)}
                        required
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="Mileage">Mileage</label>

                      <input
                        type="number"
                        placeholder="Mileage"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        onChange={(e) => setMileage(e.target.value)}
                        required
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="Price">Price</label>
                      <input
                        type="number"
                        placeholder="Price"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        required
                      />
                      <span
                        className="input-group-text text-white"
                        id="basic-addon2"
                      >
                        PKR
                      </span>
                      <div
                        id="vehiclePrice"
                        className="form-text"
                        style={{ height: 25, textTransform: "capitalize" }}
                      >
                        {formatPrice(price)}
                      </div>
                    </div>
                  </section>
                  <section>
                    <div className="grid grid-cols-12 col-span-12">
                      <div className="col-span-12 m-2">
                        <label htmlFor="Description">Description</label>
                        <textarea
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
                        value={price}
                        onChange={(e) => console.log(e)}
                        required
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="Kerb">Kerb Weight (KG)</label>
                      <input
                        type="number"
                        placeholder="Weight (KG)"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={price}
                        onChange={(e) => console.log(e)}
                        required
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="featurecheck">Overall Width (MM)</label>
                      <input
                        type="number"
                        placeholder="Width (MM)"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={price}
                        onChange={(e) => console.log(e)}
                        required
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="featurecheck">Boot Space (L)</label>
                      <input
                        type="number"
                        placeholder="Space (L)"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={price}
                        onChange={(e) => console.log(e)}
                        required
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="featurecheck">Wheel Base (MM)</label>
                      <input
                        type="number"
                        placeholder="Base (MM)"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={price}
                        onChange={(e) => console.log(e)}
                        required
                      />
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="featurecheck">No. of Doors</label>
                      <input
                        type="number"
                        placeholder="Doors"
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={price}
                        onChange={(e) => console.log(e)}
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
                        value={price}
                        onChange={(e) => console.log(e)}
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
                        value={abs}
                        onChange={(e) => console.log(e)}
                      >
                        {seats?.map((item, index) => (
                          <option selected value={item?.value}>
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
                        value={abs}
                        onChange={(e) => console.log(e)}
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
                        value={abs}
                        onChange={(e) => console.log(e)}
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
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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
                        value={categoryName}
                        onChange={(e) => console.log(e)}
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
                        value={categoryName}
                        onChange={(e) => console.log(e)}
                      />
                      <input
                        type="number"
                        name=""
                        id="HorsePower"
                        placeholder="RPM"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={categoryName}
                        onChange={(e) => console.log(e)}
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
                        value={categoryName}
                        onChange={(e) => console.log(e)}
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
                        value={categoryName}
                        onChange={(e) => console.log(e)}
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
                        value={categoryName}
                        onChange={(e) => console.log(e)}
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
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                      <label htmlFor="SpareTyre">Spare Tyre</label>

                      <select
                        id="SpareTyre"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={abs}
                        onChange={(e) => console.log(e)}
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
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                      <input
                        type="number"
                        name=""
                        id="TyreSize"
                        placeholder="Tyre Size (Ratio)"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                      <input
                        type="text"
                        name=""
                        id="TyreSize"
                        placeholder="Tyre Size (Diameter)"
                        required
                        className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-sm"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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
                      <label htmlFor="featurecheck">
                        Speed Sensing Auto Door Lock
                      </label>
                      <select
                        id="SpeedSensingAutoDoorLock"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        // value={abs}
                        onChange={(e) => console.log(e)}
                      >
                        <option selected>True / False</option>

                        {featureSelection?.map((item, index) => (
                          <option value={item?.value}>{item?.title}</option>
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
                        // value={abs}
                        onChange={(e) => console.log(e)}
                      >
                        <option selected>True / False</option>

                        {featureSelection?.map((item, index) => (
                          <option value={item?.value}>{item?.title}</option>
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
                        // value={abs}
                        onChange={(e) => console.log(e)}
                      >
                        <option selected>True / False</option>

                        {featureSelection?.map((item, index) => (
                          <option value={item?.value}>{item?.title}</option>
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
                        // value={abs}
                        onChange={(e) => console.log(e)}
                      >
                        <option selected>True / False</option>

                        {featureSelection?.map((item, index) => (
                          <option value={item?.value}>{item?.title}</option>
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
                        // value={abs}
                        onChange={(e) => console.log(e)}
                      >
                        <option selected>True / False</option>

                        {featureSelection?.map((item, index) => (
                          <option value={item?.value}>{item?.title}</option>
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
                        // value={abs}
                        onChange={(e) => console.log(e)}
                      >
                        <option selected>True / False</option>

                        {featureSelection?.map((item, index) => (
                          <option value={item?.value}>{item?.title}</option>
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
                        // value={abs}
                        onChange={(e) => console.log(e)}
                      >
                        <option selected>True / False</option>

                        {featureSelection?.map((item, index) => (
                          <option value={item?.value}>{item?.title}</option>
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
                        // value={abs}
                        onChange={(e) => console.log(e)}
                      >
                        <option selected>True / False</option>

                        {featureSelection?.map((item, index) => (
                          <option value={item?.value}>{item?.title}</option>
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
                        // value={abs}
                        onChange={(e) => console.log(e)}
                      >
                        <option selected>True / False</option>

                        {featureSelection?.map((item, index) => (
                          <option value={item?.value}>{item?.title}</option>
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
                        // value={abs}
                        onChange={(e) => console.log(e)}
                      >
                        <option selected>True / False</option>

                        {featureSelection?.map((item, index) => (
                          <option value={item?.value}>{item?.title}</option>
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
                        // value={abs}
                        onChange={(e) => console.log(e)}
                      >
                        <option selected>True / False</option>

                        {featureSelection?.map((item, index) => (
                          <option value={item?.value}>{item?.title}</option>
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
                        // value={abs}
                        onChange={(e) => console.log(e)}
                      >
                        <option selected>True / False</option>

                        {featureSelection?.map((item, index) => (
                          <option value={item?.value}>{item?.title}</option>
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
                        // value={abs}
                        onChange={(e) => console.log(e)}
                      >
                        <option selected>True / False</option>

                        {featureSelection?.map((item, index) => (
                          <option value={item?.value}>{item?.title}</option>
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
                        // value={abs}
                        onChange={(e) => console.log(e)}
                      >
                        <option selected>True / False</option>

                        {featureSelection?.map((item, index) => (
                          <option value={item?.value}>{item?.title}</option>
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
                        // value={abs}
                        onChange={(e) => console.log(e)}
                      >
                        <option selected>True / False</option>

                        {featureSelection?.map((item, index) => (
                          <option value={item?.value}>{item?.title}</option>
                        ))}
                      </select>
                    </div>
                    <br />
                    <hr />
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="featurecheck">ABS</label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={abs}
                        onChange={(e) => setABS(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="featurecheck">Air bags</label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={airbags}
                        onChange={(e) => setAirBags(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="featurecheck">AC</label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={airconditioning}
                        onChange={(e) => setAirConditioning(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="featurecheck">FM RADIO</label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={fm}
                        onChange={(e) => setFM(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="featurecheck">Cassete player</label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={cassettePlayer}
                        onChange={(e) => setCassettePlayer(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="featurecheck">CD player</label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={cdPlayer}
                        onChange={(e) => setCDPlayer(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="featurecheck">DVD player</label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={dvdPlayer}
                        onChange={(e) => setDVDPlayer(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="featurecheck">Climate control</label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={climateControl}
                        onChange={(e) => setClimateControl(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="featurecheck">front camera</label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={frontCamera}
                        onChange={(e) => setFrontCamera(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="featurecheck">front speaker</label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={frontSpeakers}
                        onChange={(e) => setFrontSpeakers(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="featurecheck">Heated seats</label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={heatedSeats}
                        onChange={(e) => setHeatedSeats(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label htmlFor="featurecheck">Immobilizer</label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={immobilizerKey}
                        onChange={(e) => setImmobilizerKey(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label
                        htmlFor="featurecheck"
                        className="form-label customCheck_label"
                      >
                        Immobilizer Key
                      </label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={immobilizerKey}
                        onChange={(e) => setImmobilizerKey(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label
                        htmlFor="featurecheck"
                        className="form-label customCheck_label"
                      >
                        Keyless Entry
                      </label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={keylessEntry}
                        onChange={(e) => setKeylessEntry(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label
                        htmlFor="featurecheck"
                        className="form-label customCheck_label"
                      >
                        Navigation System
                      </label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={navigationSystem}
                        onChange={(e) => setNavigationSystem(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label
                        htmlFor="featurecheck"
                        className="form-label customCheck_label"
                      >
                        Power Locks
                      </label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={powerLocks}
                        onChange={(e) => setPowerLocks(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label
                        htmlFor="featurecheck"
                        className="form-label customCheck_label"
                      >
                        Power Mirrors
                      </label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={powerMirrors}
                        onChange={(e) => setPowerMirrors(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 mx-2">
                      <label
                        htmlFor="featurecheck"
                        className="form-label customCheck_label"
                      >
                        Power Steering
                      </label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={powerSteering}
                        onChange={(e) => setPowerSteering(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label
                        htmlFor="featurecheck"
                        className="form-label customCheck_label"
                      >
                        Power Windows
                      </label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={powerWindows}
                        onChange={(e) => setPowerWindows(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label
                        htmlFor="featurecheck"
                        className="form-label customCheck_label"
                      >
                        Rear AC Vents
                      </label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={rearACVents}
                        onChange={(e) => setRearACVents(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label
                        htmlFor="featurecheck"
                        className="form-label customCheck_label"
                      >
                        Rear Camera
                      </label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={rearCamera}
                        onChange={(e) => setRearCamera(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label
                        htmlFor="featurecheck"
                        className="form-label customCheck_label"
                      >
                        Rear Seat Entertainment
                      </label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={rearSeatEntertainment}
                        onChange={(e) =>
                          setRearSeatEntertainment(e.target.value)
                        }
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label
                        htmlFor="featurecheck"
                        className="form-label customCheck_label"
                      >
                        Rear Speakers
                      </label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={rearSpeakers}
                        onChange={(e) => setRearSpeakers(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label
                        htmlFor="featurecheck"
                        className="form-label customCheck_label"
                      >
                        Steering Switches
                      </label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={steeringSwitches}
                        onChange={(e) => setSteeringSwitches(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label
                        htmlFor="featurecheck"
                        className="form-label customCheck_label"
                      >
                        Sun Roof
                      </label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={sunRoof}
                        onChange={(e) => setSunRoof(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label
                        htmlFor="featurecheck"
                        className="form-label customCheck_label"
                      >
                        USB and Auxillary Cable
                      </label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={usb}
                        onChange={(e) => setUSB(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label
                        htmlFor="featurecheck"
                        className="form-label customCheck_label"
                      >
                        Alloy Rims
                      </label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={alloyRims}
                        onChange={(e) => setAlloyRims(e.target.value)}
                      >
                        <option selected value="true">
                          Yes
                        </option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                      <label
                        htmlFor="featurecheck"
                        className="form-label customCheck_label"
                      >
                        Assembly
                      </label>
                      <select
                        id="featurecheck"
                        className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-sm"
                        aria-label="Default select example"
                        required
                        value={assembly}
                        onChange={(e) => setAssembly(e.target.value)}
                      >
                        <option selected value="Local">
                          Local
                        </option>
                        <option value="Imported">Imported</option>
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
                        Submit
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
