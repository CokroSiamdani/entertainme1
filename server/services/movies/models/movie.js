const { getDataBase } = require("../config/config");
const dbName = "EntertainMe";
const Movies = getDataBase().collection(dbName);
const { ObjectId } = require("mongodb");

class MovieModel {
  static find() {
    return Movies.find().toArray();
  }

  static findById(id) {
    return Movies.find({ _id: ObjectId(id) }).toArray();
  }

  static create(newMovie) {
    return Movies.insertOne(newMovie);
  }

  static delete(id) {
    return Movies.deleteOne({ _id: ObjectId(id) });
  }

  static update(id, inputData) {
    return Movies.updateOne(
      { _id: ObjectId(id) },
      { $set: inputData, $currentDate: { lastModified: true } }
    );
  }
}

module.exports = MovieModel;
