const clientsRouter = require('express').Router();

clientsRouter.get("/", (req, res) => {
    res.send("clients")
})

module.exports = clientsRouter