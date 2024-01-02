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
  const [price, setPrice] = useState("");
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

  const fetchTimeSlot = async () => {
    const res = await axios.get(`${url}/getTimeSlot`, {
      params: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const {
    data: timeSlot,
    error: timeError,
    isLoading: timeLoading,
  } = useQuery("myTimeSlot", fetchTimeSlot);

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
    // console.log("make  ", makeId);
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
    // console.log("make  ", makeId);
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

  const fetchCats = async () => {
    // console.log("make  ", makeId);
    const res = await axios.get(`${url}/categories/getAll`, {
      params: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const {
    data: cats,
    error: catsError,
    isLoading: catsLoading,
  } = useQuery(`categories`, fetchCats);

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
              console.log("Images:", [...images, imageSrc]);
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

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    const selectedBiddingTime = timeSlot.find(
      (time: { startTime: string }) => time.startTime === selectedValue
    );
    if (selectedBiddingTime) {
      setSelectedStartTime(selectedBiddingTime.startTime);
      setSelectedEndTime(selectedBiddingTime.endTime);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    // const jsonEncodedUserData = JSON.stringify(userData);
    // const jsonEncodedPostData = JSON.stringify(postData);
    console.log(jsonEncodedPostData, "jsonEncodedPostData");
    console.log(postData, "postData");
    console.log(userData, "userData");
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

        console.log(response?.data);
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

  console.log(images);
  console.log(makeId, makeName);
  return (
    <PrivateRoute requiredRoles={["ROLE_BIDDER", "Admin"]}>
      <section className="flex justify-center items-center w-[80vw] max-lg:w-[100vw]">
        {timeLoading || cityLoading ? (
          <div className="flex justify-center items-center h-screen w-full">
            <ImpulseSpinner color="#ED2024" size={120} />
          </div>
        ) : (
          <section className="flex justify-center items-center">
            <div className="w-full mt-10 xl:mt-8 container">
              <h1 className="font-bold px-4 text-4xl mt-2 mb-3">
                Add Bidding Form
              </h1>
              <h4 className="px-4">
                Dashboard / <span className="text-[#ED2024]">Add Bidding</span>
              </h4>

              <div className="">
                {/* <SideBar /> */}

                <main className="p-4 w-full">
                  <section className="rounded flex justify-center items-center flex-col bg-gray-200 p-4 gap-4 w-full">
                    <h1 className="text-blue-700 text-center text-2xl">
                      Sell your Car With 3 Easy & Simple Steps!
                    </h1>
                    <p className="text-red-500 text-center">
                      It's free and takes less than a minute
                    </p>

                    <div className="grid gap-2 grid-cols-12 w-full">
                      <div className="xl:col-span-4 col-span-6 bg-gray-100 p-4 flex justify-center items-center flex-col rounded-lg">
                        <div className="p-1 rounded-full border-[1px]">
                          <Image
                            src={PostInfo}
                            width={50}
                            height={50}
                            alt="post-info"
                          />
                        </div>

                        <p>Enter Your Car Information</p>
                      </div>

                      <div className="xl:col-span-4 col-span-6 bg-gray-100 p-4 flex justify-center items-center flex-col rounded-lg">
                        <div className="p-1 rounded-full border-[1px]">
                          <Image
                            src={PostPhotos}
                            width={50}
                            height={50}
                            alt="post-info"
                          />
                        </div>

                        <p>Upload Photos</p>
                      </div>

                      <div className="xl:col-span-4 col-span-6 bg-gray-100 p-4 flex justify-center items-center flex-col rounded-lg">
                        <div className="p-1 rounded-full border-[1px]">
                          <Image
                            src={PostPrice}
                            width={50}
                            height={50}
                            alt="post-info"
                          />
                        </div>

                        <p>Enter Your Selling Price</p>
                      </div>
                    </div>
                  </section>

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

                    <section className="grid grid-col-span-12">
                      <h1 className="text-2xl font-bold text-center my-3">
                        Personal Info
                      </h1>

                      <div className="w-full grid grid-cols-12">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          className="border-2 border-gray-200 outline-red-500 mx-2 rounded p-1 max-xl:col-span-4 m-1 text-lg max-sm:col-span-6 xl:col-span-3"
                          required
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="email"
                          placeholder="Email"
                          className="border-2 border-gray-200 outline-red-500 mx-2 rounded p-1 max-xl:col-span-4 m-1 text-lg max-sm:col-span-6 xl:col-span-3"
                          required
                          onChange={handleChange}
                        />
                        <input
                          type="number"
                          placeholder="Phone"
                          name="phone"
                          className="border-2 border-gray-200 outline-red-500 mx-2 rounded p-1 max-xl:col-span-4 m-1 text-lg max-sm:col-span-6 xl:col-span-3"
                          required
                          onChange={handleChange}
                        />
                        <input
                          type="number"
                          name="cnic"
                          placeholder="CNIC"
                          className="border-2 border-gray-200 outline-red-500 mx-2 rounded p-1 max-xl:col-span-4 m-1 text-lg max-sm:col-span-6 xl:col-span-3"
                          required
                          onChange={handleChange}
                        />
                      </div>
                    </section>

                    <section className="grid grid-col-span-12">
                      <h1 className="text-2xl font-bold text-center mt-3">
                        Vehicle Information
                      </h1>
                      <div className="grid grid-cols-12 p-1 rounded text-lg">
                        <input
                          type="text"
                          className="border-2 border-gray-200 outline-red-500 xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 p-1 rounded text-lg"
                          required
                          placeholder="title"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                          type="date"
                          className="border-2 border-gray-200 outline-red-500 xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 p-1 rounded text-lg"
                          required
                          onChange={(e) => setAuctionDate(e.target.value)}
                        />

                        <select
                          className="m-2 rounded xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 border-2 border-gray-200 outline-red-500 p-1 text-lg"
                          onChange={handleDropdownChange}
                          required
                        >
                          <option value="" selected disabled className="hidden">
                            Select start time
                          </option>

                          {timeSlot &&
                            timeSlot.map((t: any) => (
                              <option key={t.startTime} value={t.startTime}>
                                {t.startTime}
                              </option>
                            ))}
                        </select>

                        <select
                          className="m-2 rounded xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 border-2 border-gray-200 outline-red-500 p-1 text-lg"
                          onChange={(e) => setCityName(e.target.value)}
                          required
                        >
                          <option value="" selected disabled hidden>
                            Select City
                          </option>

                          {cityData &&
                            cityData.map((t: any) => (
                              <option key={t.cityId} value={t.cityName}>
                                {t.cityName}
                              </option>
                            ))}
                        </select>

                        <select
                          className="m-2 rounded xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 border-2 border-gray-200 outline-red-500 p-1 text-lg"
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

                        <select
                          className="m-2 rounded xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 border-2 border-gray-200 outline-red-500 p-1 text-lg"
                          disabled={!makeId ? true : false}
                          onChange={(e) => setModelName(e.target.value)}
                          required
                        >
                          <option value="" selected disabled hidden>
                            Select Model
                          </option>

                          {makeOne &&
                            makeOne.map((t: any) => (
                              <option key={t.mmodelId} value={t.modelName}>
                                {t.modelName}
                              </option>
                            ))}
                        </select>

                        <select
                          className="m-2 rounded xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 border-2 border-gray-200 outline-red-500 p-1 text-lg"
                          disabled={!makeId || !modelName ? true : false}
                          onChange={(e) => setYearName(e.target.value)}
                          required
                        >
                          <option value="" selected disabled hidden>
                            Select Year
                          </option>

                          {makeYear &&
                            makeYear.map((t: any) => (
                              <option key={t.yearId} value={t.year}>
                                {t.year}
                              </option>
                            ))}
                        </select>

                        {makeId && modelName && yearName && (
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="varient"
                            required
                            className="m-2 rounded xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 border-2 border-gray-200 outline-red-500 p-1 text-lg"
                          />
                        )}

                        <select
                          className="m-2 rounded xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 border-2 border-gray-200 outline-red-500 p-1 text-lg"
                          onChange={(e) => setCategoryName(e.target.value)}
                          required
                        >
                          <option value="" selected disabled hidden>
                            Engine Size
                          </option>

                          {cats &&
                            cats.map((t: any) => (
                              <option key={t.categoryId} value={t.category}>
                                {t.category}
                              </option>
                            ))}
                        </select>

                        <select
                          name="registeredIn"
                          className="m-2 rounded xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 border-2 border-gray-200 outline-red-500 p-1 text-lg"
                          id="post-registeration"
                          aria-label="Default select example"
                          required
                          placeholder="Registered In"
                          value={registeredIn}
                          onChange={(e) => setRegisteredIn(e.target.value)}
                        >
                          <option selected value="">
                            Select Registered In
                          </option>
                          <option value="Unregistered">Unregistered</option>
                          <option value="Sindh">Sindh</option>
                          <option value="Punjab">Punjab</option>
                          <option value="KPK">KPK</option>
                          <option value="Balochistan">Balochistan</option>
                        </select>

                        <select
                          name="transmission"
                          className="m-2 rounded xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 border-2 border-gray-200 outline-red-500 p-1 text-lg"
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

                        <input
                          type="text"
                          placeholder="Vehicle Color"
                          className="m-2 rounded xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 border-2 border-gray-200 outline-red-500 p-1 text-lg"
                          onChange={(e) => setVehicleColour(e.target.value)}
                          required
                        />
                        <input
                          type="number"
                          placeholder="Mileage"
                          className="m-2 rounded xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 border-2 border-gray-200 outline-red-500 p-1 text-lg h-10"
                          onChange={(e) => setMileage(e.target.value)}
                          required
                        />
                        <input
                          type="number"
                          placeholder="Price"
                          className="m-2 h-10 rounded xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 border-2 border-gray-200 outline-red-500"
                          onChange={(e) => setPrice(e.target.value)}
                          required
                        />

                        <div className="rounded xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                          <label
                            htmlFor="post-registeration"
                            className="form-label"
                          >
                            Vehicle Condition
                          </label>

                          <div className="flex gap-3">
                            <div className="flex gap-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="vehicleCondition"
                                id="vehicleNew"
                                required
                                value="New"
                                checked={vehicleCondition === "New"}
                                onChange={(e) =>
                                  setVehicleCondition(e.target.value)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="vehicleNew"
                              >
                                New
                              </label>
                            </div>
                            <div className="flex gap-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="vehicleCondition"
                                id="vehicleOld"
                                value="Used"
                                checked={vehicleCondition === "Used"}
                                onChange={(e) =>
                                  setVehicleCondition(e.target.value)
                                }
                                required
                              />
                              <label
                                className="form-check-label"
                                htmlFor="vehicleOld"
                              >
                                Used
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="rounded xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                          <label
                            htmlFor="post-registeration"
                            className="form-label"
                          >
                            Vehicle Fuel
                          </label>
                          <div className="flex gap-3">
                            <div className="flex gap-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="vehicleFuel"
                                id="vehiclePetrol"
                                value="Petrol"
                                checked={vehicleFuel === "Petrol"}
                                onChange={(e) => setVehicleFuel(e.target.value)}
                                required
                              />
                              <label
                                className="form-check-label"
                                htmlFor="vehiclePetrol"
                              >
                                Petrol
                              </label>
                            </div>
                            <div className="flex gap-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="vehicleFuel"
                                id="vehicleDiesel"
                                value="Diesel"
                                checked={vehicleFuel === "Diesel"}
                                onChange={(e) => setVehicleFuel(e.target.value)}
                                required
                              />
                              <label
                                className="form-check-label"
                                htmlFor="vehicleDiesel"
                              >
                                Diesel
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <h1 className="text-2xl font-bold text-center m-3">
                      Features
                    </h1>
                    <section className="grid grid-cols-12">
                      <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2">
                        <label htmlFor="featurecheck">ABS</label>
                        <select
                          id="featurecheck"
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-lg"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-xl"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-xl"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-xl"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-xl"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-xl"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-xl"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-xl"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-xl"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-xl"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-xl"
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
                          className="w-full col-span-3 border-2 border-gray-200 outline-red-500 p-1 rounded text-xl"
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

                      <div className="grid grid-cols-12 col-span-12">
                        <div className="xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 m-2 rounded">
                          <label
                            htmlFor="featurecheck"
                            className="form-label customCheck_label"
                          >
                            Starting Amount
                          </label>
                          <input
                            type="number"
                            placeholder="starting amount"
                            className="border-2 border-gray-200 outline-red-500 w-full p-1 rounded text-xl"
                            onChange={(e) => setStartingAmount(e.target.value)}
                            required
                          />
                        </div>

                        <div className="col-span-12 m-2">
                          <label
                            htmlFor="featurecheck"
                            className="form-label customCheck_label"
                          >
                            Description
                          </label>
                          <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border-2 border-gray-200 outline-red-500 p-1 rounded text-xl"
                            rows={5}
                            placeholder="description"
                            required
                          ></textarea>
                        </div>

                        <div className="w-full col-span-12 flex gap-2">
                          <input type="checkbox" id="exampleCheck1" required />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheck1"
                          >
                            I accpet above given information is correct In case
                            of any false information your Ad will be rejected!
                          </label>
                        </div>
                      </div>
                    </section>

                    <section className="my-2">
                      <h1 className="text-red-600 text-2xl mb-2">
                        Contact Information
                      </h1>
                      <div className="grid grid-cols-12">
                        <input
                          type="number"
                          placeholder="mobile number"
                          className="border-2 border-gray-200 outline-red-500 xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 p-1 rounded text-xl"
                          required
                        />
                        <input
                          type="number"
                          placeholder="secondary mobile number"
                          className="border-2 border-gray-200 outline-red-500 xl:col-span-3 max-xl:col-span-4 max-md:col-span-6 mx-2 p-1 rounded text-xl"
                        />
                      </div>
                    </section>

                    <section className="flex justify-center items-center">
                      {submitting ? (
                        <button
                          type="button"
                          className="bg-gray-500 px-4 py-2 cursor-not-allowed rounded text-white mt-2 text-xl"
                        >
                          Submitting ...
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="bg-red-500 px-4 py-2 rounded text-white mt-2 text-xl"
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
        )}
      </section>
    </PrivateRoute>
  );
};

export default index;
