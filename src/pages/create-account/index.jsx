import Link from "next/link";
import { useState } from "react";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();

  // password shaw and hide handler
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mx-auto shadow-md bg-gray-300 rounded-md px-3 md:px-5 lg:px-0">
      <div className="mx-auto py-8 flex justify-center items-center max-w-[800px] ">
        <div className=" bg-white w-full rounded-lg p-10 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Create Account</h2>
          <form onSubmit={() => {}}>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Full Name <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                id="name"
                className={`outline-none w-full p-2 border border-gray-300 rounded-md`}
                placeholder="Sharmin Jahan Lucky"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Phone <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                className={`outline-none w-full p-2 border border-gray-300 rounded-md`}
                placeholder="+880 088 8888 888"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Email <span className="text-[red]">*</span>
              </label>
              <input
                type="email"
                className={`outline-none w-full p-2 border border-gray-300 rounded-md`}
                placeholder="jimi.uae@gmail.com"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Password <span className="text-[red]">*</span>
              </label>
              {/* <input
                type={showPassword ? "text" : "password"}
                className={`outline-none w-full p-2 border border-gray-300 rounded-md`}
                placeholder="********"
              /> */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`outline-none w-full p-2 border border-gray-300 rounded-md pr-12`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 p-2 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      class="h-4 text-gray-700 false"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="currentColor"
                        d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      class="h-4 text-gray-700 false"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Address <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                className={`outline-none w-full p-2 border border-gray-300 rounded-md`}
                placeholder="UAE, Sharjah"
              />
            </div>

            <div className=" flex gap-3">
              <div className="mb-4 w-full ">
                <label className="block mb-2 font-medium">City</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Rolla"
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block mb-2 font-medium">State</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Sharjah"
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block mb-2 font-medium">Zip Code</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="00000"
                />
              </div>
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md font-medium mt-4 hover:bg-blue-600`}
            >
              Submit
            </button>
          </form>
          <div className="flex justify-center gap-2 mt-4">
            <p className="text-md text-center dark:text-gray-400">
              Already have an account?
            </p>
            <Link
              href="/sign-in"
              className="hover:underline text-blue-500 font-medium"
            >
              <span className="flex">
                Sign in
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-blue-500"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
