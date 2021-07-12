const Router = require("express").Router;
const createPolls = require("../handlers/create-polls");
const createVotes = require("../handlers/create-votes");
const getPoll = require("../handlers/get-poll");
const createPollsValidator = require("../validators/create-polls");
const createVotesValidator = require("../validators/create-votes");
module.exports = (app, db, redisdb) => {
  const router = new Router();
  //   we are posting the polls send to us by the user
  router.post("/polls", createPollsValidator, createPolls(db));
  router.put("/polls/:poll", createVotesValidator, createVotes(db, redisdb));
  router.get("/polls/:poll", getPoll(db));
  app.use(router);
};
