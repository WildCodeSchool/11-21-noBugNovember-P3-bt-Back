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
      let datas2 = [id, contactType_id]
      connection.query(sql2, datas2, (err2, result2) => {
        if (err2) {
          console.error(err2)
          res.status(500).send('Error requesting POST2 clients')
        } else {
          let datas3 = [id, languages_id]
          connection.query(sql3, datas3, (err3, result3) => {
            if (err3) {
              console.error(err3)
              res.status(500).send('Error requesting POST3 clients')
            } else {
              let datas4 = [id, service_id]
              connection.query(sql4, datas4, (err4, result4) => {
                if (err4) {
                  console.error(err4)
                  res.status(500).send('Error requesting POST4 clients')
                } else {
                  res.status(200).json(result)
                }
              })
            }
          })
        }
      })
    }
  })
})

clientsRouter.get('/form', (req, res) => {
  let id = req.params.id
  let sqlpro = 'SELECT id, projectsName FROM projects;'
  let sqlfun = 'SELECT id, functionName FROM fonction;'
  let sqlfavc = 'SELECT id, favoriteContactName FROM contactType;'
  let sqlkob = 'SELECT id, kindOfBusinessName FROM companyType;'
  let sqldeserv = 'SELECT id, desiredServiceName FROM service;'
  let projects = []
  let fonction = []
  let contactType = []
  let companyType = []
  let service = []

  connection.query(sqlpro, id, (errpro, resultpro) => {
    if (errpro) {
      console.error(errpro)
      res.status(500).send('Error requesting form datas')
    } else {
      resultpro.forEach(pr =>
        projects.push({
          id: pr.id,
          value: pr.projectsName,
          label: pr.projectsName
        })
      )
      connection.query(sqlfun, (errfun, resultfun) => {
        if (errfun) {
          console.error(errfun)
        } else {
          resultfun.forEach(fun =>
            fonction.push({
              id: fun.id,
              value: fun.functionName,
              label: fun.functionName
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
              value: favc.favoriteContactName,
              label: favc.favoriteContactName
            })
          )
          connection.query(sqlkob, (errkob, resultkob) => {
            if (errkob) {
              console.error(errkob)
            } else {
              resultkob.forEach(kob =>
                companyType.push({
                  id: kob.id,
                  value: kob.kindOfBusinessName,
                  label: kob.kindOfBusinessName
                })
              )
              connection.query(sqldeserv, (errdeserv, resultdeserv) => {
                if (errdeserv) {
                  console.error(errdeserv)
                } else {
                  resultdeserv.forEach(deserv =>
                    service.push({
                      id: deserv.id,
                      value: desiredServiceName,
                      label: desiredServiceName
                    })
                  )
                  const options = {
                    projects: [...projects],
                    contactType: [...contactType],
                    companyType: [...companyType],
                    service: [...service]
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

module.exports = clientsRouter
