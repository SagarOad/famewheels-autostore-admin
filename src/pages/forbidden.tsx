import Image from "next/image";
import { Inter } from "next/font/google";
import PrivateRoute from "../route/PrivateRoute";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <h1>You are not allowed.</h1>;
}
