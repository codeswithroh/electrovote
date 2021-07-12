module.exports = {
  databaseUri:
    process.env.DATABASE_URI ||
    "mongodb+srv://codeswithroh:codeswithroh001@cluster0.ba5m9.mongodb.net/voting",
  port: process.env.PORT || 4000,
};
