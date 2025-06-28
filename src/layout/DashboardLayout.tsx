import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
