const statsRouter = require('express').Router();

statsRouter.get("/", (req, res) => {
    res.send("stats")
})

module.exports = statsRouter