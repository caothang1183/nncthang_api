const jwt = require("jsonwebtoken");

module.exports = (router, verifyToken) => {
    router.get("/users", verifyToken, (req, res) => {
        jwt.verify(req.token, "secretKey", err => {
            if (err) return res.sendStatus(403).json(err);
            res.json({ page: "users" });
        });
    });
};
