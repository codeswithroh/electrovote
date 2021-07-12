const Express = require("express");
// const Config = require("./config");
const setupRedis = require("./setup/redis");
const setupMiddleware = require("./setup/middleware");
const setupDatabase = require("./setup/database");
const setupRouter = require("./setup/router");
require("dotenv").config();
const app = Express();
setupMiddleware(app);

async function start() {
  const db = await setupDatabase();
  const redisdb = await setupRedis();
  setupRouter(app, db, redisdb);
  app.listen(process.env.PORT||4000, () => {
    console.log("server running on port", process.env.PORT||4000);
  });
}
start().catch(console.error);
