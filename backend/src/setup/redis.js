const redis = require("redis");

module.exports = () => {
  return redis.createClient(
    {
        host: "redis-19973.c241.us-east-1-4.ec2.cloud.redislabs.com",
        password: "RsiXVbcQkjFsUfnr5OZUHGgkLLzeOlft",
        port: 19973,
      }
  );
};
