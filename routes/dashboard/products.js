const express = require("express");
const router = express.Router();

router.get("/", (_req, res) => {
  res.render("products");
});

router.get("/1", (_req, res) => {
    res.render("products");
  });

module.exports = router;
