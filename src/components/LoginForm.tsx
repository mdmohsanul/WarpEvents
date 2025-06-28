import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAppDispatch } from "@/app/store";
import { login } from "@/features/auth/authThunk";
import { loginSchema, type LoginData } from "@/schema/logins-schema";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [err, setErr] = useState<undefined | null | string>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });
  const onSubmit: SubmitHandler<LoginData> = (data: LoginData) => {
    try {
      dispatch(login(data)).then((result) => {
        if (login.rejected.match(result)) {
          const errorMessage =
            typeof result.payload === "string"
              ? result.payload
              : "Something went wrong";

          setErr(errorMessage);
          reset();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto  bg-white  space-y-4"
      >
        {/* Email Field */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium text-gray-900">
            Email
          </label>
          <input
            id="email"
            type="text"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
            autoComplete="email"
            placeholder="bob@gmail.com"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-600 text-sm">{errors.email?.message}</p>
        </div>

        {/* Password Field */}
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium text-gray-900">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="*********"
            aria-invalid={errors.password ? "true" : "false"}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-600 text-sm">{errors.password?.message}</p>
        </div>

        {err && (
          <p className="text-red-600 ">⚠ {err || "Invalid Credentials"}</p>
        )}
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-stone-800 cursor-pointer text-white rounded-md hover:bg-stone-900 transition"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginForm;
