import Sidebar from "@/components/common/Sidebar";
import UserMenu from "@/components/common/UserMenu";
import { Helmet } from "react-helmet";
import { GoLinkExternal } from "react-icons/go";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <section className="bg-white">
       <Helmet>
        <title>Dashboard Page || Blinkeyit</title>
      </Helmet>
      <div className="container mx-auto p-3 grid lg:grid-cols-[250px,1fr]  ">
        {/**left for menu */}
        <div className="py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r ">
          <Sidebar />
        </div>

        {/**right for content */}
        <div className="bg-white min-h-[75vh] ">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
