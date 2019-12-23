const jwt = require("jsonwebtoken");

module.exports = (router, verifyToken) => {
  router.get("/products", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretKey", err => {
      if (err) return res.sendStatus(403);
      res.json({ page: "products" });
    });
  });
};
