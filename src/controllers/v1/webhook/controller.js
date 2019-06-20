import { HttpMethod, route } from "koa-decorator";
import { getUserProfile, pushMessage } from "../../../utils";
import user from '../../../models/user.schema'
@route("/v1/webhook")
export default class Member {
  @route("/", HttpMethod.POST)
  async webhooks(ctx) {
    let reply_token = ctx.request.body;
    ctx.body = reply_token;
    const userID = reply_token.events[0].source.userId;
    if (reply_token.events[0].message.text === "ลงทะเบียน" || reply_token.events[0].message.text === "สมัครสมาชิก" ) {
      getUserProfile(userID).then(users => {
        user.create(users)
      });
      pushMessage(userID, "ลงทะเบียนเรียบร้อย");
    } else {
      const userID = reply_token.events[0].source.userId;
      pushMessage(userID, "กรุณากรอกคำว่าลงทะเบียนเพื่อรับข้อมูลจากเรา");
    }
  }
}
