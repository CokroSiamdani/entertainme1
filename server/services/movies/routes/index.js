const router = require("express").Router();
const MovieController = require("../controllers/movie");

router.get("/movies", MovieController.find);
router.post("/movies", MovieController.create);
router.get("/movies/:id", MovieController.findById);
router.delete("/movies/:id", MovieController.delete);
router.put("/movies/:id", MovieController.update);

module.exports = router;
