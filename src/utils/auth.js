// const { default: cookies } = require("./cookies");

import cookies from "./cookies";

const loggedInUser = cookies.get("user_info");

export {
  loggedInUser,
}