import cookies from "@/utils/cookies";
import React, { useEffect, useState } from "react";

function Profile() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Get auth data from from cookies
  useEffect(() => {
    const authUser = cookies.get("user_info");
    if (authUser?.id) {
      setLoggedInUser(authUser);
    } else {
      setLoggedInUser(null); // User is not logged in
    }
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto pb-10">
      <div className="flex mt-8 mb-8">
        <div className=" ml-8 shadow-lg bg-white w-full border-gray-300 rounded-md pb-12">
          <p className="pb-2 pl-8 pt-2 rounded-sm bg-[#835c83] text-white text-2xl font-bold">
            Profile Info
          </p>
          <div className="grid grid-cols-2 pl-8 mt-8  gap-x-14 gap-y-8 auto-rows-max ">
            <div className="md:w-full md:mb-0">
              <label className="block w-full mb-2 text-lg font-bold tracking-wide text-gray-700 ">
                Name
              </label>

              <p className="capitalize text-lg">{loggedInUser?.name}</p>
            </div>

            <div className="md:w-full md:mb-0">
              <label className="block w-full mb-2 text-lg font-bold tracking-wide text-gray-700 ">
                Email
              </label>

              <p className="text-lg">{loggedInUser?.email}</p>
            </div>

            <div className="md:w-full md:mb-0">
              <label className="block w-full mb-2 text-lg font-bold tracking-wide text-gray-700 ">
                Phone
              </label>

              <p className="text-lg">{loggedInUser?.phone ?? "N/A"}</p>
            </div>
            <div className="mmd:w-full md:mb-0">
              <label className="block w-full mb-2 text-lg font-bold tracking-wide text-gray-700 ">
                Address
              </label>

              <p className="text-lg">{loggedInUser?.address ?? "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
