const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3002;
const mongo = require("./config/config");

mongo.connect(function (err) {
  if (!err) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.get('/', (_, res) => res.json({ message: 'TvSeries service is running'}))
    app.use("/", require("./routes"));

    app.listen(PORT, function () {
      console.log(`TvSeries is running on port ${PORT}`);
    });
  }
});
