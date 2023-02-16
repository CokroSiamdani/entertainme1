const express = require("express");
const app = express();
const axios = require("axios");
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/movies", (req, res) => {
  console.log("MASSSSUUUKKK");
  axios
    .get("http://localhost:3001/movies")
    .then((result) => {
      res.status(200).json(result.data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.post("/movies", (req, res) => {
  axios
    .get("http://localhost:3001/movies", req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.put("/movies", (req, res) => {
  axios
    .get(`http://localhost:3001/movies/${req.params.id}`, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.put("/movies", (req, res) => {
  axios
    .delete(`http://localhost:3001/movies/${req.params.id}`)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.listen(PORT, () => {
  console.log(`Orchestrator running on port ${PORT}`);
});
