const expertsRouter = require('express').Router();

expertsRouter.get("/", (req, res) => {
    res.send("experts")
})

module.exports = expertsRouter