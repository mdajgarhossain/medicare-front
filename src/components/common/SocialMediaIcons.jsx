import cookies from "@/utils/cookies";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { TfiLinkedin } from "react-icons/Tfi";

const SocialMediaIcons = () => {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Get auth data from from cookies
  useEffect(() => {
    const authUser = cookies.get("user_info");
    if (authUser?.id) {
      setLoggedInUser(authUser);
    } else {
      setLoggedInUser(null); // User is not logged in
    }
  }, []);

  const CustomButton = ({ className, title, ...props }) => {
    const buttonClasses = `font-bold py-2 lg:px-4 px-2 lg:my-0 rounded ${
      className ?? "bg-blue-500 hover:bg-blue-700 text-white"
    }`;

    return (
      <button className={buttonClasses} {...props}>
        {title}
      </button>
    );
  };

  const handleLogout = () => {
    setProcessing(true);

    // Remove auth data from cookies
    cookies.remove("token", { path: "/", expires: new Date(0) });
    cookies.remove("user_info", { path: "/", expires: new Date(0) });
    localStorage.removeItem("cart");
    localStorage.removeItem("contactSellCart");

    // Redirect to sign-in page after logging out
    setTimeout(() => {
      setLoggedInUser(null);
      setProcessing(false);
      window.location.replace("/sign-in");
    }, 500);
  };

  return (
    <div className="justify-end gap-2 mt-2 lg:flex">
      <div className="hidden lg:block">
        {loggedInUser ? (
          <button
            title="Logout"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-base text-center py-2 lg:px-4 px-2 lg:my-0"
            disabled={processing}
            onClick={handleLogout}
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
                Logging out...
              </div>
            ) : (
              "Logout"
            )}
          </button>
        ) : (
          <CustomButton
            title="Sign In"
            className="text-black bg-yellow-500 hover:bg-yellow-600"
            onClick={() => router.push("/sign-in")}
          />
        )}
      </div>
      <a
        // href="https://www.facebook.com/profile.php?id=100063579536034"
        href="#"
        // target="_blank"
        rel="noopener noreferrer"
        className="flex rounded-lg items-center lg:px-3 py-2 px-2 my-[2px] lg:my-0 text-white bg-[#1877f2]"
      >
        <span className="sr-only">Facebook</span>
        <FaFacebookF className="w-3 h-3 lg:h-5 lg:w-5" />
      </a>

      <a
        // href="https://twitter.com/Mohamma85629351"
        // target="_blank"
        href="#"
        rel="noopener noreferrer"
        className="flex rounded-lg items-center lg:px-3 py-2 px-2 my-[2px] lg:my-0 text-white bg-[#1da1f3]"
      >
        <FaTwitter className="w-3 h-3 text-white lg:h-5 lg:w-5" />
      </a>

      <a
        // href="https://www.instagram.com/hasaninternational2020/"
        // target="_blank"
        href="#"
        rel="noopener noreferrer"
        className="flex items-center text-white rounded-lg"
      >
        <img
          className="lg:h-10 lg:w-10 w-[28px] h-6 lg:my-0 my-[2px]"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png?20210403190622"
          alt="Instagram"
        />
      </a>

      <a
        // href="https://www.linkedin.com/signup/cold-join?session_redirect=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2Ffeed%2F%3Ftrk%3Donboarding-landing&trk=login_reg_redirect"
        // target="_blank"
        href="#"
        rel="noopener noreferrer"
        className="flex rounded-lg items-center lg:px-3 py-2 px-2 my-[2px] lg:my-0 text-white bg-[#0077b5]"
      >
        <TfiLinkedin className="w-3 h-3 lg:h-5 lg:w-5" />
      </a>
      <a
        // href="https://www.youtube.com/channel/UCrAQh80mx-kM5Z7lE52mJLw"
        // target="_blank"
        href="#"
        rel="noopener noreferrer"
        className="flex rounded-lg items-center lg:px-3 py-2 px-2 my-[2px] lg:my-0 text-white bg-[#ff0000]"
      >
        <FaYoutube className="w-3 h-3 text-white lg:h-5 lg:w-5" />
      </a>
    </div>
  );
};

export default SocialMediaIcons;
