const statsRouter = require('express').Router()
const connection = require('../config/db.js')

statsRouter.get('/globalStats', (req, res) => {
  let global = {}
  let sql =
    'SELECT s.status FROM projects AS p JOIN status AS s ON p.status_id = s.id'
  let sql2 = 'SELECT clients.id FROM clients'
  let sql3 = 'SELECT experts.id FROM experts'
  let sql4 =
    'SELECT DISTINCT ep.experts_id FROM btht.experts_has_projects AS ep INNER JOIN projects AS p ON projects_id = p.id WHERE p.status_id = 3 AND ep.answer = 1'
  let sql5 =
    'SELECT SUM(totalPrice) AS DoneCA FROM projects WHERE status_id = 3'
  let sql6 =
    'SELECT SUM(totalPrice) AS OngoingCA FROM projects WHERE status_id = 1 OR status_id = 2'
  let sql7 =
    'SELECT SUM(factuByExpert) AS CostExperts FROM experts_has_projects AS ep INNER JOIN projects AS p ON ep.projects_id = p.id WHERE ep.answer = 1 AND p.status_id = 3'
  let sql8 = 'SELECT projects.id FROM projects'
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error 1st line')
    } else {
      const doneProjects = result.filter(
        project => project.status === 'completed'
      ).length
      const ongoingProjects = result.filter(
        project => project.status !== 'completed'
      ).length
      global.doneprojects = doneProjects
      global.ongoingProjects = ongoingProjects
      connection.query(sql2, (err, result2) => {
        if (err) {
          console.error(err)
          res.status(500).send('Error 2nd line')
        } else {
          global.totalClients = result2.length
          connection.query(sql3, (err, result3) => {
            if (err) {
              console.error(err)
              res.status(500).send('Error 3rd line')
            } else {
              global.totalExperts = result3.length
              connection.query(sql4, (err, result4) => {
                if (err) {
                  console.error(err)
                  res.status(500).send('Error 4th line')
                } else {
                  global.expertsWorked = result4.length
                  connection.query(sql5, (err, result5) => {
                    if (err) {
                      console.error(err)
                      res.status(500).send('Error 5th line')
                    } else {
                      const result5Data = { ...result5[0] }
                      global = { ...global, ...result5Data }
                      connection.query(sql6, (err, result6) => {
                        if (err) {
                          console.error(err)
                          res.status(500).send('Error 6th line')
                        } else {
                          const result6Data = { ...result6[0] }
                          global = { ...global, ...result6Data }
                          connection.query(sql7, (err, result7) => {
                            if (err) {
                              console.error(err)
                              res.status(500).send('Error 7th line')
                            } else {
                              const result7Data = { ...result7[0] }
                              global = { ...global, ...result7Data }
                              connection.query(sql8, (err, result8) => {
                                if (err) {
                                  console.error(err)
                                  res.status(500).send('Error 8th line')
                                } else {
                                  const totalProjects = result8.length
                                  global.totalProjects = totalProjects
                                  res.status(200).json(global)
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
})

module.exports = statsRouter
