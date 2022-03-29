const clientsRouter = require('./clients');
const expertsRouter = require('./experts');
const filterRouter = require('./filter'); 
const projectsRouter = require('./projects');
const projexpertsRouter = require('./projexperts')
const statsRouter = require('./stats')

const setupRoutes = app => {
  app.use('/clients', clientsRouter)

  app.use('/experts', expertsRouter)

  app.use('/filter', filterRouter); 

  app.use('/projects', projectsRouter);

  app.use('/projexperts', projexpertsRouter)

  app.use('/stats', statsRouter)
}

module.exports = { setupRoutes }
