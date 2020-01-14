const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user_routers = require("./api/users");
const product_routers = require("./api/products");
const task_routers = require("./api/task");
const User = require("../models/User");
const bodyParser = require("body-parser");
const auth = bodyParser.urlencoded({ extended: false });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

router.get("/", (_req, res) => {
    res.json({ message: "welcome to nncthang-api" });
});

router.post("/auth", auth, function(req, res) {
    User.findOne({ username: req.body.username }, function(error, user) {
        if (error) return res.send(error);
        if (user.length < 0) return res.json({ message: `user's not exist` });
        if (user.role.role_type !== 1) return res.json({ message: `user doesn't have permission` });
        if (!bcrypt.compareSync(req.body.password, user.password)) return res.sendStatus(403);
        jwt.sign({ user }, "secretKey", { expiresIn: "86400s" }, (err, token) => {
            if (err) return res.send(err);
            res.json({ "access-token": `nncthang|${token}` });
        });
    });
});

verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["access-token"];
    if (typeof bearerHeader === "undefined") return res.sendStatus(403);
    bearerHeader.replace("Bearer", "nncthang|");
    const bearer = bearerHeader.split("|");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
};

user_routers(router, verifyToken);
product_routers(router, verifyToken);
task_routers(router);

router.get("/*", (req, res) => {
    res.status(404).json({
        message: "Not Found",
        description: "Route not found"
    });
});

module.exports = router;
