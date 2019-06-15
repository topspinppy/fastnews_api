import { HttpMethod, route } from "koa-decorator";
import { getUserProfile, pushMessage } from "../../../utils";

@route("/v1/webhook")
export default class Member {
  @route("/", HttpMethod.POST)
  async webhooks(ctx) {
    let reply_token = ctx.request.body;
    ctx.body = reply_token;
    if (reply_token.events[0].message.text === "ลงทะเบียน") {
      const userID = reply_token.events[0].source.userId;
      getUserProfile(userID).then(user => {
        console.log(user);
      });
      pushMessage(userID, "ลงทะเบียนเรียบร้อย");
    } else {
      const userID = reply_token.events[0].source.userId;
      pushMessage(userID, "เรื่องงของกู");
    }
  }
}
