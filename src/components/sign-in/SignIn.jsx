import Link from "next/link";
import { useState } from "react";

const SingIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className=" px-3 md:px-5 lg:px-0 bg-gray-300 rounded-md">
      <div className="mx-auto py-8 flex justify-center items-center max-w-[800px] ">
        <div className="w-full bg-white shadow-md rounded-lg p-10  mx-auto">
          <h2 className="text-2xl font-bold mb-4">Sign In</h2>
          <form onSubmit={() => {}}>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Email <span className="text-[red]">*</span>
              </label>
              <input
                // {...register("email", {
                //   required: "Email is required",
                //   pattern: {
                //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                //     message: "Invalid email address",
                //   },
                // })}
                type="email"
                className={`outline-none w-full p-2 border border-gray-300 rounded-md`}
                placeholder="Enter your email"
              />
              {/* {errors.email && (
                <span className="text-red-500 p-0 m-0">
                  {" "}
                  {errors.email.message}
                </span>
              )} */}
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Password <span className="text-[red]">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                // {...register("password")}
                className={`outline-none w-full p-2 border border-gray-300 rounded-md`}
                placeholder="Enter your password"
              />
            </div>
            {/* {errors.password && (
              <p className="text-red-500 p-0 m-0"> {errors.password.message}</p>
            )} */}

            <button
              className="py-1"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>

            <button
              type="submit"
              // disabled={!isValid}
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md"
            >
              Log in
            </button>
          </form>
          <div className="flex justify-between mt-4">
            <p className="text-sm text-center dark:text-gray-400">
              {"Don't"} have an account yet?
            </p>
            <Link
              href="/sing-up"
              className="hover:underline text-blue-500 hover:text-violet-400"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingIn;




