const router = require("express").Router();
const TvSerieController = require("../controllers/tv_series");

router.get("/tv", TvSerieController.find);
router.post("/tv", TvSerieController.create);
router.get("/tv/:id", TvSerieController.findById);
router.delete("/tv/:id", TvSerieController.delete);
router.put("/tv/:id", TvSerieController.update);

module.exports = router;
