import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { medicareApi } from "@/utils/http";

const ContactForm = () => {
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required"),
    phone: yup.string(),
    message: yup.string(),
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
   * Add contact info.
   */
  function addContact(data) {
    setProcessing(true);
    let formData = new FormData();

    // Define the list of fields you want to include in the formData
    const fieldsToInclude = ["name", "email", "phone", "message"];

    // Use a loop to append valid and non-empty fields to formData
    fieldsToInclude.forEach((field) => {
      if (data[field]) {
        formData.append(field, data[field]);
      }
    });

    medicareApi
      .post("/contact", formData)
      .then((response) => {
        resetAllValue();
        // toast.success("Conatct info is sent", { duration: 1000 });
        setProcessing(false);
      })
      .catch((error) => {
        setProcessing(false);
        if (error.response?.data?.type === "ValidationException") {
          toast.error(error?.response?.errors[0]?.message, { duration: 3000 });
        }
      });
  }

  return (
    <div className="w-full px-3 md:px-0 md:w-full pb-20 bg-cover bg-center pt-3 bg-[#bdc3c7]">
      <h2 className="headline text-[#5f27cd] mb-10">Contact</h2>
      <form className="w-full mx-auto text-gray-100 md:w-5/6 lg:w-1/2">
        <div className="mt-2 mb-2">
          <input
            {...register("name")}
            className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-500 shadow appearance-none focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-base text-red-500">{errors.name?.message}</p>
          )}
        </div>
        <div className="mb-2">
          <input
            {...register("email")}
            className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-500 shadow appearance-none focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-base text-red-500">{errors.email?.message}</p>
          )}
        </div>
        <div className="mt-2 mb-2">
          <input
            {...register("phone")}
            className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-500 shadow appearance-none focus:outline-none focus:shadow-outline"
            id="phone"
            type="number"
            name="phone"
            placeholder="Enter your Phone"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone?.message}</p>
          )}
        </div>
        <div className="mb-2">
          <textarea
            {...register("message")}
            className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-500 shadow appearance-none focus:outline-none focus:shadow-outline"
            id="message"
            rows="6"
            placeholder="Enter your message"
            name="message"
          ></textarea>
          {errors.message && (
            <p className="text-sm text-red-500">{errors.message?.message}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[142px] px-4 py-2 bg-[#5f27cd] text-white font-bold rounded transition duration-300 hover:bg-blue-900 transform text-xl hover:scale-80"
            disabled={processing}
            onClick={handleSubmit(addContact)}
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
    </div>
  );
};

export default ContactForm;
