const express = require("express");
const router = express.Router();
const user_routers = require("./dashboard/users");
const product_routers = require("./dashboard/products");

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

router.get("/", forwardAuthenticated, (_req, res) => {
  res.render("index");
});

router.use("/users", user_routers);
router.use("/dashboard/products", ensureAuthenticated, product_routers);

router.get("/dashboard/*", (req, res) => {
  res.status(404).render("common/404");
});

router.get("/success", ensureAuthenticated, (req, res) =>
  res.render("success", {
    user: req.user
  })
);



module.exports = router;
