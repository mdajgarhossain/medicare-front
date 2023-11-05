// // This is a custom HOC for route protection
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import cookies from "@/utils/cookies";

// function withAuth(Component) {
//   return (props) => {
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//       const loggedInUser = cookies.get("user_info");
//       const token = cookies.get("token");

//       // Check if the user is authenticated
//       const isAuthenticated = !!loggedInUser && !!token;

//       if (!isAuthenticated) {
//         router.push("/sign-in");
//       } else {
//         setIsLoading(false); // Authentication check is complete
//       }
//     }, []);

//     if (isLoading) {
//       // Show a loading state or component while checking authentication
//       return (
//         <div className="flex items-center justify-center h-96">
//           <svg
//             className="animate-spin h-16 w-16 text-gray-400"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             />
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm8 8a8 8 0 008-8h4a12 12 0 01-12 12v-4zm0-16a8 8 0 018 8H8a12 12 0 01-12-12v4z"
//             />
//           </svg>
//         </div>
//       );
//     }

//     return <Component {...props} />;
//   };
// }

// export default withAuth;