import {
  CreateAccount,
  DontHaveAccount,
  EmailAddressLogIn,
  Href,
  OrSignInWith,
  Password,
  RememberPassword,
  SignIn,
  SignInToAccount,
} from "@/Constant";
import { useAppSelector } from "@/Redux/Hooks";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../../public/assets/images/logo/fame-wheels-logo.png";
import imageTwo from "../../../../public/assets/images/logo/logo-white.png";
import { UserSocialApp } from "./UserSocialApp";
import axios from "axios";

export const UserForm = () => {
  const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

  const { i18LangStatus } = useAppSelector((store) => store.langSlice);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("test123@gmail.com");
  const [password, setPassword] = useState("Test@123");
  const router = useRouter();

  const formSubmitHandle = async () => {
    // window.location.reload();
    try {
      const params = {
        email: email,
        password: password,
      };
      const response = await axios.post(`${BASE_URL}/adminlogin`, params);

      const token = await response?.data?.token;
      localStorage.setItem("authToken", response?.data?.token);
      Cookies.set("mofi_token", JSON.stringify(true));
      router.push(`/en/dashboard/default_dashboard`);

      if (response?.data?.token) {
        toast.success("Successfully Loggedin");
      }

      router.push("/");
    } catch (error: any) {
      alert("Please Enter Valid Email Or Password");
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <div>
        <Link
          className="logo"
          href={`/${i18LangStatus}/dashboard/default_dashboard`}
        >
          <img
            className="img-fluid for-light"
            src={imageOne.src}
            alt="login page"
            width={200}
          />
          <img
            className="img-fluid for-dark"
            src={imageTwo.src}
            alt="login page"
            width={200}
          />
        </Link>
      </div>
      <div className="login-main">
        <Form className="theme-form">
          <h4>{SignInToAccount}</h4>
          <p>Enter your email & password to login</p>
          <FormGroup>
            <Label className="col-form-label">{EmailAddressLogIn}</Label>
            <Input
              type="email"
              defaultValue={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="test123@gmail.com"
            />
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label">{Password}</Label>
            <div className="position-relative">
              <Input
                type={show ? "text" : "password"}
                defaultValue={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Test@123"
              />
              <div className="show-hide" onClick={() => setShow(!show)}>
                <span className="show"> </span>
              </div>
            </div>
          </FormGroup>
          <FormGroup className="mb-0">
            <div className="checkbox p-0">
              <Input id="checkbox1" type="checkbox" />
              <Label className="text-muted" htmlFor="checkbox1">
                {RememberPassword}
              </Label>
            </div>
            <div className="text-end mt-3">
              <Button
                color="primary"
                block
                className="w-100"
                onClick={formSubmitHandle}
              >
                {SignIn}
              </Button>
            </div>
          </FormGroup>
          <h6 className="text-muted mt-4 or">{OrSignInWith}</h6>
          <UserSocialApp />
          <p className="mt-4 mb-0 text-center">
            {DontHaveAccount}
            <Link className="ms-2" href={Href}>
              {CreateAccount}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};
