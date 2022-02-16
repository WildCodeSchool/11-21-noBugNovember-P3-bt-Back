const projectsRouter = require('express').Router();

projectsRouter.get("/", (req, res) => {
    res.send("projects")
})

module.exports = projectsRouter