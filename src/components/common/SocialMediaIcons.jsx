import { useRouter } from "next/router";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { TfiLinkedin } from "react-icons/Tfi";

const SocialMediaIcons = () => {
  const router = useRouter();

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

  return (
    <div className="justify-end gap-2 mt-2 lg:flex">
      <div className="hidden lg:block">
        <CustomButton
          title="Sign In"
          className="text-black bg-yellow-500 hover:bg-yellow-600 "
          onClick={() => router.push('/sign-in')}
        />
      </div>
      <a
        href="https://www.facebook.com/profile.php?id=100063579536034"
        target="_blank"
        rel="noopener noreferrer"
        className="flex rounded-lg items-center lg:px-3 py-2 px-2 my-[2px] lg:my-0 text-white bg-[#1877f2]"
      >
        <span className="sr-only">Facebook</span>
        <FaFacebookF className="w-3 h-3 lg:h-5 lg:w-5" />
      </a>

      <a
        href="https://twitter.com/Mohamma85629351"
        target="_blank"
        rel="noopener noreferrer"
        className="flex rounded-lg items-center lg:px-3 py-2 px-2 my-[2px] lg:my-0 text-white bg-[#1da1f3]"
      >
        <FaTwitter className="w-3 h-3 text-white lg:h-5 lg:w-5" />
      </a>

      <a
        href="https://www.instagram.com/hasaninternational2020/"
        target="_blank"
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
        href="https://www.linkedin.com/signup/cold-join?session_redirect=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2Ffeed%2F%3Ftrk%3Donboarding-landing&trk=login_reg_redirect"
        target="_blank"
        rel="noopener noreferrer"
        className="flex rounded-lg items-center lg:px-3 py-2 px-2 my-[2px] lg:my-0 text-white bg-[#0077b5]"
      >
        <TfiLinkedin className="w-3 h-3 lg:h-5 lg:w-5" />
      </a>
      <a
        href="https://www.youtube.com/channel/UCrAQh80mx-kM5Z7lE52mJLw"
        target="_blank"
        rel="noopener noreferrer"
        className="flex rounded-lg items-center lg:px-3 py-2 px-2 my-[2px] lg:my-0 text-white bg-[#ff0000]"
      >
        <FaYoutube className="w-3 h-3 text-white lg:h-5 lg:w-5" />
      </a>
    </div>
  );
};

export default SocialMediaIcons;
