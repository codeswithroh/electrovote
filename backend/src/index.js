const Express = require("express");
const Config = require("./config");
const setupRedis = require("./setup/redis");
const setupMiddleware = require("./setup/middleware");
const setupDatabase = require("./setup/database");
const setupRouter = require("./setup/router");
const app = Express();
setupMiddleware(app);

async function start() {
  const db = await setupDatabase();
  const redisdb = await setupRedis();
  setupRouter(app, db, redisdb);
  app.listen(Config.port, () => {
    console.log("server running on port", Config.port);
  });
}
start().catch(console.error);
