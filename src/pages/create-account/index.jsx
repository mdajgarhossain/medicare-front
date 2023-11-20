import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { medicareApi } from "@/utils/http";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const CreateAccount = () => {
  const [processing, setProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    phone: yup.string(),
    address: yup.string(),
    city: yup.string(),
    state: yup.string(),
    zipCode: yup.string(),
  });

  // Form validation hooks
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  /**
   * Create Account.
   */
  function createAccount(data) {
    setProcessing(true);
    let formData = new FormData();

    // Define the list of fields you want to include in the formData
    const fieldsToInclude = [
      "name",
      "email",
      "password",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
    ];

    // Use a loop to append valid and non-empty fields to formData
    fieldsToInclude.forEach((field) => {
      if (data[field]) {
        formData.append(field, data[field]);
      }
    });

    medicareApi
      .post("/user/register", formData)
      .then((response) => {
        toast.success("Account is created", { duration: 3000 });
        resetAllValue();
        router.push("/sign-in");
      })
      .catch((error) => {
        setProcessing(false);
        if (error.response?.data?.type === "ValidationException") {
          toast.error(error?.response?.errors[0]?.message, { duration: 3000 });
        }
      });
  }

  /**
   * Reset all data form inputs.
   */
  function resetAllValue() {
    reset({
      name: null,
      email: null,
      password: null,
      phone: null,
      address: null,
      city: null,
      state: null,
      zipCode: null,
    });
  }

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
                Name <span className="text-[red]">*</span>
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className={`outline-none w-full p-2 border border-gray-300 rounded-md`}
                placeholder="Sharmin Jahan Lucky"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name?.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Email <span className="text-[red]">*</span>
              </label>
              <input
                {...register("email")}
                type="email"
                className={`outline-none w-full p-2 border border-gray-300 rounded-md`}
                placeholder="jimi.uae@gmail.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email?.message}</p>
              )}
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
                  {...register("password")}
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
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Phone</label>
              <input
                {...register("phone")}
                type="text"
                className={`outline-none w-full p-2 border border-gray-300 rounded-md`}
                placeholder="+880 088 8888 888"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone?.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Address</label>
              <input
                {...register("address")}
                type="text"
                className={`outline-none w-full p-2 border border-gray-300 rounded-md`}
                placeholder="UAE, Sharjah"
              />
              {errors.address && (
                <p className="text-sm text-red-500">
                  {errors.address?.message}
                </p>
              )}
            </div>

            <div className=" flex gap-3">
              <div className="mb-4 w-full ">
                <label className="block mb-2 font-medium">City</label>
                <input
                  {...register("city")}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Rolla"
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city?.message}</p>
                )}
              </div>
              <div className="mb-4 w-full">
                <label className="block mb-2 font-medium">Area</label>
                <input
                  {...register("state")}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Sharjah"
                />
                {errors.state && (
                  <p className="text-sm text-red-500">
                    {errors.state?.message}
                  </p>
                )}
              </div>
              <div className="mb-4 w-full">
                <label className="block mb-2 font-medium">Postal Code</label>
                <input
                  {...register("zipCode")}
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="00000"
                />
                {errors.zipCode && (
                  <p className="text-sm text-red-500">
                    {errors.zipCode?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8 mt-4">
              {/* <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 border-2 py-2 px-4 rounded"
              onClick={resetAllValue}
            >
              Reset
            </button> */}
              <button
                onClick={handleSubmit(createAccount)}
                disabled={processing}
                type="submit"
                className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md font-medium mt-4 hover:bg-blue-600`}
              >
                {processing ? (
                  <div className="flex items-center">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
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
