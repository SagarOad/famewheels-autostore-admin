import React, { useState } from "react";
import logo from "../assets/fame-wheels-logo.png";
import Lottie from "lottie-react";
import axios from "axios";
import { useEffect } from "react";
import loadindAnim from "../components/lottieAnimations/loadingAnim.json";
import loginAnim from "../components/lottieAnimations/carride.json";
import { useRouter } from "next/router";
import { useAuth } from "../context/authContext";
import Image from "next/image";
import toast from "react-hot-toast";
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL_TESTING}`;

const Login = () => {
  const { authState } = useAuth();

  const [email, seEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = {
        email: email,
        password: password,
      };
      const response = await axios.post(`${BASE_URL}/adminlogin`, params);

      const token = await response?.data?.token;
      localStorage.setItem("authToken", response?.data?.token);

      if (response?.data?.token) {
        toast.success("Successfully Loggedin");
      }

      login(token);
      router.push("/");
    } catch (error: any) {
      console.error("Login failed", error);
      if (error?.response?.status === 400) {
        toast.error(error?.response?.data?.error);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const user = localStorage.getItem("userData");
    if (user) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <main className="h-screen flex justify-between gap-1">
      <article className="h-screen w-1/2 lg:flex hidden justify-center items-center">
        <Lottie loop={true} autoPlay={true} animationData={loginAnim} />
      </article>
      <form
        className="lg:w-1/2 w-full bg-gray-50 p-4 rounded-lg h-full flex flex-col justify-center items-center"
        onSubmit={handleLogin}
        id="form"
      >
        {/* top  */}
        <section className="flex justify-center items-center w-full">
          <Image
            src="/assets/fame-wheels-logo.png"
            width={500}
            height={500}
            alt="logo"
            loading="lazy"
            className="lg:w-[30%] md:w-[50%]"
          />
        </section>
        {/* heading  */}
        <section className="my-5">
          <h1 className="text-3xl font-bold mb-3 text-center text-[#ED2024]">
            Login
          </h1>
        </section>
        <section className="sm:mx-20  mt-10 w-full lg:px-10 flex">
          <div className="flex justify-center flex-col gap-8 w-full">
            <div className="flex flex-col justify-center items-center">
              <label className="text-xl">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => seEmail(e.target.value)}
                className="border-2 mt-2 2xl:w-2/3 w-full border-gray-300 outline-[#ED2024] rounded-full p-3 bg-transparent text-center text-xl"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <label className="text-xl">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 mt-2 2xl:w-2/3 w-full border-gray-300 outline-[#ED2024] rounded-full p-3 bg-transparent text-center text-xl"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex justify-center items-center">
              {loading === false ? (
                <button
                  onSubmit={handleLogin}
                  type="submit"
                  className="mt-3 rounded-full bg-[#ED2024] 2xl:w-2/3 w-full hover:bg-orange-600 py-3 text-white text-xl font-semibold"
                >
                  Login
                </button>
              ) : (
                <p className="mt-3 rounded-full text-center 2xl:w-2/3 w-full bg-gray-500 py-3 text-white text-xl font-semibold">
                  Loading...
                </p>
              )}
            </div>

            {/* <div className="flex justify-center items-center">
              <span className="text-[#ED2024] font-semibold text-center cursor-pointer w-fit">
                Forgot Password
              </span>
            </div> */}
          </div>
        </section>
      </form>
    </main>
  );
};

export default Login;
