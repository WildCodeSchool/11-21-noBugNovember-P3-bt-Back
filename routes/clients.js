const clientsRouter = require('express').Router()
const connection = require('../config/db.js')

clientsRouter.get('/', (req, res) => {
  let sql =
    'SELECT cl.id, cl.firstname, cl.lastname, cl.email, cl.phone, cl.city, cl.feedbackclient AS feedbackClient, cl.numClients AS numClient, ct.companyTypeName, c.companyName, group_concat(DISTINCT cty.contactTypeName) AS contactType, group_concat(DISTINCT l.languagesName) AS languages,group_concat(DISTINCT se.serviceName) AS service,group_concat(DISTINCT projects.numProject) AS numProject FROM clients AS cl INNER JOIN companytype AS ct ON ct.id = cl.companyType_id INNER JOIN company AS c ON c.id = cl.company_id INNER JOIN clients_has_contacttype ON cl.id = clients_has_contacttype.clients_id INNER JOIN contacttype AS cty ON cty.id = clients_has_contacttype.contactType_id INNER JOIN clients_has_languages ON cl.id = clients_has_languages.clients_id INNER JOIN languages AS l ON l.id = clients_has_languages.languages_id INNER JOIN clients_has_service ON cl.id = clients_has_service.clients_id INNER JOIN service AS se ON se.id = clients_has_service.service_id INNER JOIN projects ON cl.id = projects.client_id GROUP BY cl.id'
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting GET clients')
    } else {
      res.status(200).json(result)
    }
  })
})

clientsRouter.get('/form', (req, res) => {
  let id = req.params.id
  let sqlprojects = 'SELECT id, numProject FROM projects;'
  let sqlfun = 'SELECT id, fonctionName FROM fonction;'
  let sqlfavc = 'SELECT id, contactTypeName FROM contactType;'
  let sqlkob = 'SELECT id, companyTypeName FROM companyType;'
  let sqldeserv = 'SELECT id, serviceName FROM service;'
  let sqllang = 'SELECT id, languagesName FROM languages;'
  let projects = []
  let fonction = []
  let contactType = []
  let companyType = []
  let service = []
  let languages = []

  connection.query(sqlprojects, (errprojects, resultprojects) => {
    if (errprojects) {
      console.error(errprojects)
      res.status(500).send('Error requesting form datas')
    } else {
      resultprojects.forEach(project =>
        projects.push({
          id: project.id,
          value: project.numProject,
          label: project.numProject
        })
      )
      connection.query(sqllang, (errlang, resultlang) => {
        if (errlang) {
          console.error(errlang)
          res.status(500).send('Error requesting form datas')
        } else {
          resultlang.forEach(language =>
            languages.push({
              if: language.id,
              value: language.languagesName,
              label: language.languagesName
            })
          )
        }
      })
      connection.query(sqlfun, (errfun, resultfun) => {
        if (errfun) {
          console.error(errfun)
        } else {
          resultfun.forEach(fun =>
            fonction.push({
              id: fun.id,
              value: fun.fonctionName,
              label: fun.fonctionName
            })
          )
        }
      })
      connection.query(sqlfavc, (errfavc, resultfavc) => {
        if (errfavc) {
          console.error(errfavc)
        } else {
          resultfavc.forEach(favc =>
            contactType.push({
              id: favc.id,
              value: favc.contactTypeName,
              label: favc.contactTypeName
            })
          )
          connection.query(sqlkob, (errkob, resultkob) => {
            if (errkob) {
              console.error(errkob)
            } else {
              resultkob.forEach(kob =>
                companyType.push({
                  id: kob.id,
                  value: kob.companyTypeName,
                  label: kob.companyTypeName
                })
              )
              connection.query(sqldeserv, (errdeserv, resultdeserv) => {
                if (errdeserv) {
                  console.error(errdeserv)
                } else {
                  resultdeserv.forEach(deserv => {
                    service.push({
                      id: deserv.id,
                      value: deserv.serviceName,
                      label: deserv.serviceName
                    })
                  })
                  const options = {
                    projects: [...projects],
                    fonction: [...fonction],
                    contactType: [...contactType],
                    companyType: [...companyType],
                    service: [...service],
                    languages: [...languages]
                  }
                  res.status(200).json(options)
                }
              })
            }
          })
        }
      })
    }
  })
})

clientsRouter.post('/', (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    city,
    feedbackClient,
    companyType_id,
    company_id,
    numClients,
    contactType_id,
    clients_id,
    languages_id,
    service_id
  } = req.body

  let datas = [
    firstname,
    lastname,
    email,
    phone,
    city,
    feedbackClient,
    numClients,
    companyType_id,
    company_id
  ]

  let sql =
    'INSERT INTO clients (firstname, lastname , email, phone, city, feedbackClient, numClients, companyType_id, company_id) VALUES (?,?,?,?,?,?,?,?,?);'
  let sql2 =
    'INSERT INTO clients_has_contacttype (clients_id, contactType_id) VALUES (?,?);'
  let sql3 =
    'INSERT INTO clients_has_languages (clients_id, languages_id) VALUES (?,?);'
  let sql4 =
    'INSERT INTO clients_has_service (clients_id, service_id) VALUES (?,?);'

  connection.query(sql, datas, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting POST clients')
    } else {
      const id = result.insertId
      let ctc = []
      for (let i = 0; i < contactType_id.length; i++) {
        ctc.push([id, contactType_id[i]])
      }
      connection.query(sql2, [ctc], (err2, result2) => {
        if (err2) {
          console.error(err2)
          res.status(500).send('Error requesting POST2 clients')
        } else {
          let lan = []
          for (let i = 0; i < languages_id.length; i++) {
            lan.push([id, languages_id[i]])
          }
          connection.query(sql3, [lan], (err3, result3) => {
            if (err3) {
              console.error(err3)
              res.status(500).send('Error requesting POST3 clients')
            } else {
              let svc = []
              for (let i = 0; i < service_id.length; i++) {
                svc.push([id, service_id[i]])
              }
              connection.query(sql4, [svc], (err4, result4) => {
                if (err4) {
                  console.error(err4)
                  res.status(500).send('Error requesting POST4 clients')
                } else {
                  res.status(200).json(result4)
                }
              })
            }
          })
        }
      })
    }
  })
})

module.exports = clientsRouter
