import { HttpMethod, route } from "koa-decorator";
import axios from "axios";
import { boardCastMessage } from "../../../utils/boardcast";

const middlelogin = async (ctx, next) => {
  // Set response body (will be sent as JSON)
  console.log(ctx.request.body);
  
  await next();
};
@route("/v1/message")
export default class BoardCast {
  @route("/boardcast", HttpMethod.POST, middlelogin)
  async sendMessage(ctx) {
    let message = ctx.request.body;
    let state = await boardCastMessage(message.message);
    ctx.body = {
      status: state.status,
      message: state.statusText
    };
  }
}
