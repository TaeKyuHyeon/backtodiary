const express = require("express");
const router = express.Router();
const generatorRoutes = require("./generator");
const imageFactory = require("./image");

router.use("/generateImage", generatorRoutes);
router.use("/image", imageFactory);
router.get("/example", (req, res) => res.send("Hello, Swagger!"));

module.exports = router;
