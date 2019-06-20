import { HttpMethod, route } from "koa-decorator";
import { pushMessage } from "../../../utils";

@route("/v1/message")
export default class Message {
  @route("/send", HttpMethod.POST)
  async sendMessage(ctx) {
    let reply_token = ctx.request.body;
    console.log(reply_token)
    pushMessage(reply_token.userID, reply_token.message);
    
    ctx.body = {
      message: 200
    }
  }
}
