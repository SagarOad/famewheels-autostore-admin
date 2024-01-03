import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/authContext";
import Sidebar from "@/components/sideBar";
import MainLayout from "@/layout/main";

const PrivateRoute: React.FC<{
  requiredRoles?: string[];
  children: ReactNode;
}> = ({ children, requiredRoles }) => {
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    } else if (
      requiredRoles &&
      !requiredRoles.some((role) => authState.user?.role_name === role)
    ) {
      // router.push("/");
    }
  }, [authState.token, authState.user, requiredRoles, router]);

  return authState.token &&
    (!requiredRoles ||
      requiredRoles.some((role) => authState.user?.role_name === role)) ? (
    <>{children}</>
  ) : null;
};

export default PrivateRoute;
