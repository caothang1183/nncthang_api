const Task = require("../../models/Task");
var bodyParser = require("body-parser");
var taskForm = bodyParser.urlencoded({ extended: false });

module.exports = router => {
    router.get("/tasks", (req, res) => {
        Task.find().then(data => {
            if (data.length < 0) return res.json({ message: `empty tasks` });
            return res.status(200).json({ data: data });
        });
    });

    router.post("/tasks", taskForm, (req, res) => {
        Task.create(req.body).then(data => {
            res.status(200).json(data);
        });
    });

    router.get("/tasks/:id", (req, res) => {
        Task.findOne({ _id: req.params.id }).then(data => {
            if (!data) return res.status(500).json({ message: `task's not exist` });
            return res.status(200).json({ data: data });
        });
    });

    router.post("/tasks/:id", taskForm, (req, res) => {
        Task.findOne({ _id: req.params.id }).then((data) => {
            if (!data) return res.status(500).json({ message: `task's not exist` });
            data.task = req.body.task !== undefined ? req.body.task : data.task;
            data.note = req.body.note !== undefined ? req.body.note : data.note;
            data.save((err, data) => {
                if (err)
                    return res
                        .status(500)
                        .send(err)
                        .json({ message: "something wrong" });
                return res.status(200).json({ message: "task updated", data: data });
            });
        });
    });
};
