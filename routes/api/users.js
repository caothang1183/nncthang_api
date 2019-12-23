const express = require("express");
const router = express.Router();

router.get("/", (_req, res) => {
    res.json({ page: "users" });
});

module.exports = router;
