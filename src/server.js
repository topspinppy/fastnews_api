import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { load } from "koa-decorator";
import appConfig from "./configs/app";
import path from "path";

const app = new Koa();

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

const server = app
  .listen(appConfig.NODE_PORT, () => {
    console.log(`app listening run on port ${appConfig.NODE_PORT} `);
  })
  .on("error", err => {
    console.log("error = ", err);
  });

export default server;
