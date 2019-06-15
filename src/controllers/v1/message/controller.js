import { HttpMethod, route } from "koa-decorator";
import { getUserProfile, pushMessage } from "../../../utils";

@route("/v1/message")
export default class Message {
  @route("/send", HttpMethod.POST)
  async sendMessage(ctx) {
    /**
     * {
      "userID": "Ua9741380c0d1b46f76b1ec3a6aeaa71b",
      "message": "ไปเซเว่นกัน"
    } *
    **/
    let reply_token = ctx.request.body;
    pushMessage(reply_token.userID, reply_token.message);
  }
}
