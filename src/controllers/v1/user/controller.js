import { HttpMethod, route } from "koa-decorator";
import { getUserProfile, pushMessage } from "../../../utils";
import user from '../../../models/user.schema'

@route("/v1/user")
export default class Message {
  @route("/all", HttpMethod.GET)
  async getAllUser(ctx) {
    const usersAll = await user.find({})
    ctx.body = usersAll
  }
}
