const { promisify } = require("util");
const { response } = require("express");

module.exports = (db, redisdb) => {
  const saddAsync = promisify(redisdb.sadd).bind(redisdb);
  const sismembeAsync = promisify(redisdb.sismember).bind(redisdb);
  return async (request, response) => {
    const isMember= await sismembeAsync(request.params.poll, request.body.ip)
    if (isMember) {
        return response.status(400).json({
            message:'You have already voted for this poll'
        })
    }
    const result = await db.collection("polls").updateOne(
      {
        _id: request.params.poll,
        "choices._id": request.body.choice,
      },
      {
        $inc: {
          "choices.$.count": 1,
        },
      }
    );
    // {poll-id:[the ip of user]}
    await saddAsync(request.params.poll, request.body.ip);
    return response.json({
      message: "vote has been registered",
    });
  };
};
