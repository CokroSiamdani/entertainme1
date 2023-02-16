const MovieModel = require("../models/movie");

class MovieController {
  static find(req, res, next) {
    MovieModel.find()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }

  static findById(req, res, next) {
    MovieModel.findById(req.params.id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }

  static create(req, res, next) {
    console.log("MASUK", req.body);
    MovieModel.create(req.body)
      .then((result) => {
        res.status(200).json(result.ops[0]);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }

  static delete(req, res, next) {
    MovieModel.delete(req.params.id)
      .then((result) => {
        res.status(200).json(`Success deleted movie with _id ${req.params.id}`);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }

  static update(req, res, next) {
    MovieModel.update(req.params.id, req.body)
      .then((result) => {
        res
          .status(200)
          .json(`Success edited movie with _id ${req.params.id}`);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
}

module.exports = MovieController;
