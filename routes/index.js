const authRouter = require('./auth')
const clientsRouter = require('./clients')
const expertsRouter = require('./experts')
const projectsRouter = require('./projects')
const statsRouter = require('./stats')

const setupRoutes = app => {
  app.use('/auth', authRouter)

  app.use('/clients', clientsRouter)

  app.use('/experts', expertsRouter)

  app.use('/projects', projectsRouter)

  app.use('/stats', statsRouter)
}

module.exports = { setupRoutes }
