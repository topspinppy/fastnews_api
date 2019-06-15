import configs from "../../configs/app";
import axios from "axios";

const curlToLine = (method, body) => {
  axios({
    method: "post",
    url: `${configs.LINE_API.MESSAGING_API}/${method}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${configs.LINE_API.LINE_HEADER.Authorization}`
    },
    data: body
  }).then(response => {
    console.log("response => ", response.status);
  });
};

const pushMessage = (id, msg) => {
  let body = JSON.stringify({
    // push body
    to: id,
    messages: [
      {
        type: "text",
        text: msg
      }
    ]
  });
  curlToLine("push", body);
};

export default pushMessage;
