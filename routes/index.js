const express = require("express");
const router = express.Router();
const generatorRoutes = require("./generator");

router.use("/generateImage", generatorRoutes);
router.get("/example", (req, res) => res.send("Hello, Swagger!"));

module.exports = router;
