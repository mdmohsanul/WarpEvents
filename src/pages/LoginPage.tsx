import { useAppSelector } from "@/app/store";
import LoginForm from "@/components/LoginForm";
import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* <img src={Fotive} alt="logo" loading="lazy" className="pt-3" /> */}
        <h1 className="text-4xl">WarpEvents</h1>
        <div className="max-w-md mx-auto  border border-gray-200 rounded-md p-7 shadow-[0_3px_10px_rgb(0,0,0,0.2)] my-5">
          <h1 className="text-3xl text-gray-900 text-start pb-5 font-medium">
            Sign up
          </h1>
          <LoginForm />
        </div>
        <p className="text-center pb-5">
          <span>New to WarpEvent? </span>
          <Link
            to="/signup"
            className="text-blue-600 font-semibold cursor-pointer hover:underline hover:underline-offset-3 decoration-blue-500"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
