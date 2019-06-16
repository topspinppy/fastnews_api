import { HttpMethod, route } from "koa-decorator";
import axios from 'axios';
// import configs from "../../../configs";


const boardCastMessage = async (msg) => {
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
      "Authorization": "Bearer MK1Eob7t8YohHTKqNn4AQ98y1Y6N1oszYU9XWaa09IpX1+XHe8ebqqTIE+10ObkjYepIzPtgHVYN3ZWRHPwBPeHSRRO0JT/pEQ/N9l57NRduzJUFwyaoHDGTm/6Sf9/ZiKutX0FN5wRFR5zEjYsRawdB04t89/1O/w1cDnyilFU="
    },
    data: body
  })

  return body.status
};

@route("/v1/message")
export default class BoardCast {
  @route("/boardcast", HttpMethod.POST)
  async sendMessage(ctx) {
    let message = ctx.request.body;
    let state = await boardCastMessage(message.message);
    console.log(state)
    ctx.body = {
      status: state.status,
      message: state.statusText
    }
    
  }
}
