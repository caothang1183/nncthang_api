const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const Product = require("../../models/Product");
const productForm = bodyParser.urlencoded({ extended: false });

module.exports = (router, verifyToken) => {
    router.get("/products", verifyToken, (req, res) => {
        jwt.verify(req.token, "secretKey", err => {
            var { page, perPage } = req.query;
            var options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 10,
                sort: { created_at: 1 },
                status: true
            };
            Product.paginate({}, options).then(data => {
                if (!data) return res.status(404).json({ message: "data not found" });
                return res.status(200).json(data);
            });
        });
    });
};
