const { getDataBase } = require("../config/config");
const dbName = "EntertainMe";
const TvSeries = getDataBase().collection(dbName);
const { ObjectId } = require("mongodb");

class TvSerieModel {
  static find() {
    return TvSeries.find().toArray();
  }

  static findById(id) {
    return TvSeries.find({ _id: ObjectId(id) }).toArray();
  }

  static create(newTvSerie) {
    return TvSeries.insertOne(newTvSerie);
  }

  static delete(id) {
    return TvSeries.deleteOne({ _id: ObjectId(id) });
  }

  static update(id, inputData) {
    return TvSeries.updateOne(
      { _id: ObjectId(id) },
      { $set: inputData, $currentDate: { lastModified: true } }
    );
  }
}

module.exports = TvSerieModel;
