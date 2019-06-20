import configs from "../../configs/app";
import axios from "axios";

export const boardCastMessage = async msg => {
  let body = JSON.stringify({
    messages: [
      {
        type: "text",
        text: msg
      }
    ]
  });

  const bodys = await axios({
    method: "post",
    url: "https://api.line.me/v2/bot/message/broadcast",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${configs.LINE_API.LINE_HEADER.Authorization}`
    },
    data: body
  });

  return bodys;
};
