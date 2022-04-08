const creaRouter = require('./creation')
const authRouter = require('./auth')
const clientsRouter = require('./clients')
const expertsRouter = require('./experts')
const filterRouter = require('./filter')
const projectsRouter = require('./projects')
const projexpertsRouter = require('./projexperts')
const statsRouter = require('./stats')

const setupRoutes = app => {
  app.use('/clients', clientsRouter)

  app.use('/experts', expertsRouter)

  app.use('/filter', filterRouter)

  app.use('/creation', creaRouter)

  app.use('/auth', authRouter)

  app.use('/clients', clientsRouter)

  app.use('/projexperts', projexpertsRouter)

  app.use('/stats', statsRouter)

  app.use('/projects', projectsRouter)
}

module.exports = { setupRoutes }
