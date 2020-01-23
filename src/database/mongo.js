const { MongoClient } = require("mongodb");

let database = null;

async function startDatabase() {
  const mongoDBURL = "mongodb://127.0.0.1:27017/canesDB";
  const connection = await MongoClient.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  database = connection.db();
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = { getDatabase, startDatabase };
