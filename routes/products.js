const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { ensureAuthenticated } = require("../config/auth");

router.get("/", ensureAuthenticated, (_req, res) => {
    res.json({ page: "products" });
});

module.exports = router;
