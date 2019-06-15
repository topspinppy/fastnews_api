import configs from "../../configs/app";
import axios from "axios";

const getUserProfile = async userID => {
  const userProfile = await axios({
    method: "get",
    url: `${configs.LINE_API.USER_PROFILE}/${userID}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${configs.LINE_API.LINE_HEADER.Authorization}`
    }
  });
  return userProfile.data;
};


export default getUserProfile;