const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "EntertainMe";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function connect(callBack) {
  client.connect(function (err) {
    if (err) {
      console.log("Error connection to mongo", err);
    } else {
      console.log("successfully connect to mongo");
      db = client.db(dbName);
    }
    callBack(err);
  });
}

function getDataBase() {
  return db;
}

module.exports = {
  connect,
  getDataBase,
};
