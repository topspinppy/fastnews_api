import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { load } from "koa-decorator";
import appConfig from "./configs/app";
import path from "path";
import mongoose from "mongoose";
import jwt from 'jwt-simple';

const app = new Koa();

app.use(async (ctx, next) => {
  // Set response body (will be sent as JSON)
  ctx.body = { message: 'Hello world' };

  await next();
});

app.use(bodyParser());
const apiRouter = load(path.resolve(__dirname, "controllers"), "controller.js");

app.use(apiRouter.routes());
app.use(
  apiRouter.allowedMethods({
    throw: true,
    notImplemented: () => new errors.NotImplemented("NotImplemented"),
    methodNotAllowed: () => new errors.MethodNotAllowed("MethodNotAllowed")
  })
);

mongoose.connect("mongodb://fastnews:fastnews1234@ds137857.mlab.com:37857/fastnews", { useNewUrlParser: true });

const server = app
  .listen(appConfig.NODE_PORT, () => {
    console.log(`app listening run on port ${appConfig.NODE_PORT} `);
  })
  .on("error", err => {
    console.log("error = ", err);
  });

export default server;
