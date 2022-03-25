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

  let sqlfavc = 'SELECT id, contactTypeName FROM contactType;'
  let sqlkob = 'SELECT id, companyTypeName FROM companyType;'
  let sqldeserv = 'SELECT id, serviceName FROM service;'
  let sqllang = 'SELECT id, languagesName FROM languages;'
  let sqlcie = 'SELECT id, companyName FROM company;'
  let companyName = []
  let contactType = []
  let companyType = []
  let service = []
  let languages = []

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
              resultdeserv.forEach(deserv =>
                service.push({
                  id: deserv.id,
                  value: deserv.serviceName,
                  label: deserv.serviceName
                })
              )
              connection.query(sqllang, (errlang, resultlang) => {
                if (errlang) {
                  console.error(errlang)
                  res.status(500).send('Error requesting form datas')
                } else {
                  resultlang.forEach(language =>
                    languages.push({
                      id: language.id,
                      value: language.languagesName,
                      label: language.languagesName
                    })
                  )
                  connection.query(sqlcie, (errcie, resultcie) => {
                    if (errcie) {
                      console.error(errcie)
                      res.status(500).send('Error requesting form datas')
                    } else {
                      resultcie.forEach(company =>
                        companyName.push({
                          id: company.id,
                          value: company.companyName,
                          label: company.companyName
                        })
                      )
                      const options = {
                        contactType: [...contactType],
                        companyType: [...companyType],
                        service: [...service],
                        languages: [...languages],
                        companyName: [...companyName]
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
    }
  })
})

clientsRouter.get('/form/:id', (req, res) => {
  let id = req.params.id
  console.log('fomid id', id)
  let sql =
    'SELECT cl.id, cl.firstname, cl.lastname, cl.email, cl.phone, cl.city, cl.feedbackclient AS feedbackClient, cl.numClients AS numClient, ct.companyTypeName, c.companyName, group_concat(DISTINCT cty.contactTypeName SEPARATOR ", ") AS contactType, group_concat(DISTINCT l.languagesName SEPARATOR ", ") AS languages,group_concat(DISTINCT se.serviceName SEPARATOR ", ") AS service,group_concat(DISTINCT projects.numProject SEPARATOR ", ") AS numProject FROM clients AS cl INNER JOIN companytype AS ct ON ct.id = cl.companyType_id INNER JOIN company AS c ON c.id = cl.company_id INNER JOIN clients_has_contacttype ON cl.id = clients_has_contacttype.clients_id INNER JOIN contacttype AS cty ON cty.id = clients_has_contacttype.contactType_id INNER JOIN clients_has_languages ON cl.id = clients_has_languages.clients_id INNER JOIN languages AS l ON l.id = clients_has_languages.languages_id INNER JOIN clients_has_service ON cl.id = clients_has_service.clients_id INNER JOIN service AS se ON se.id = clients_has_service.service_id INNER JOIN projects ON cl.id = projects.client_id WHERE cl.numClients IN (SELECT cl.numClients FROM clients AS cl) AND cl.id = ? GROUP BY cl.id'
  connection.query(sql, id, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting GET clients')
    } else {
      const id = result[0].id
      const numClient = result[0].numClient
      const firstname = result[0].firstname
      const lastname = result[0].lastname
      const phone = result[0].phone
      const email = result[0].email
      const city = result[0].city

      let companyName = []
      if (result[0].companyName) {
        const cieArr = result[0].companyName.split(', ')
        for (let i = 0; i < cieArr.length; i++) {
          companyName.push({ value: cieArr[i], label: cieArr[i] })
        }
      }
      let contactType = []
      if (result[0].contactType) {
        const pjtArr = result[0].contactType.split(', ')
        for (let i = 0; i < pjtArr.length; i++) {
          contactType.push({ value: pjtArr[i], label: pjtArr[i] })
        }
      }
      let companyType = []
      if (result[0].companyTypeName) {
        const cietArr = result[0].companyTypeName.split(', ')
        for (let i = 0; i < cietArr.length; i++) {
          companyType.push({ value: cietArr[i], label: cietArr[i] })
        }
      }
      let service = []
      if (result[0].service) {
        const pjtArr = result[0].service.split(', ')
        for (let i = 0; i < pjtArr.length; i++) {
          service.push({ value: pjtArr[i], label: pjtArr[i] })
        }
      }
      let languages = []
      if (result[0].languages) {
        const pjtArr = result[0].languages.split(', ')
        for (let i = 0; i < pjtArr.length; i++) {
          languages.push({ value: pjtArr[i], label: pjtArr[i] })
        }
      }
      const feedbackClient = result[0].feedbackClient

      const datas = {
        id: id,
        numClient: numClient,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        city: city,
        companyName: companyName,
        contactType: contactType,
        companyType: companyType,
        service: service,
        languages: languages,
        feedbackClient: feedbackClient
      }
      res.status(200).json(datas)
    }
  })
})

clientsRouter.post('/test', (req, res) => {
  const { table, column, value } = req.body
  let sql = `INSERT INTO ${table} (${column}) VALUE (?);`
  connection.query(sql, value, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting POST experts')
    } else {
      const id = result.insertId
      const newItem = { id: id, value: value, label: value }
      res.status(200).json(newItem)
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

clientsRouter.put('/form/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const body = req.body
  const sqlData1 = {
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    phone: body.phone,
    city: body.city,
    company_id: body.company_id,
    numClients: body.numClients,
    companyType_id: body.companyType_id
  }
  const sqlData2 = body.languages_id
  const sqlData3 = body.contactType_id
  const sqlData4 = body.service_id

  let resultEnd = ''

  let sql1 = 'UPDATE clients SET '
  let sql2Del = 'DELETE FROM clients_has_languages WHERE clients_id = ?'
  let sql2Post =
    'INSERT INTO clients_has_languages (clients_id, languages_id) VALUES ?;'
  let sql3Del = 'DELETE FROM clients_has_contacttype WHERE clients_id = ?'
  let sql3Post =
    'INSERT INTO clients_has_contacttype (clients_id, contactType_id) VALUES ?;'
  let sql4Del = 'DELETE FROM clients_has_service WHERE clients_id = ?'
  let sql4Post =
    'INSERT INTO clients_has_service (clients_id, service_id) VALUES ?;'

  /***************** SQLDATA1 - datas ********************/
  const datas = Object.entries(sqlData1)
  let myArray = datas
    .filter(element => element[1] !== undefined)
    .filter(element => element[1] !== '')
    .filter(element => element[1].length !== 0)
    .filter(element => element[1].length !== null)

  let sql1Val = []

  await myArray.map((array, i, arr) => {
    if (i < arr.length - 1) {
      sql1 += `${array[0]} = ?, `
      sql1Val.push(array[1])
    } else {
      sql1 += `${array[0]} = ? `
      sql1Val.push(array[1])
    }
  })

  sql1 += 'WHERE id = ?;'
  sql1Val.push(id)

  /********************** SQLDATA1 - DATAS ******************/
  if (myArray.length > 0) {
    connection.query(sql1, sql1Val, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating sql1 experts')
      } else {
        resultEnd = result
      }
    })
  }

  /********************** SQLDATA2 - LANGUAGES ******************/
  if (sqlData2.length > 0) {
    connection.query(sql2Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE2 experts')
      } else {
        let lan = []
        for (let i = 0; i < sqlData2.length; i++) {
          lan.push([id, sqlData2[i]])
        }
        connection.query(sql2Post, [lan], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST2 experts')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }

  /********************** SQLDATA3 - CONTACT TYPE ******************/
  if (sqlData3.length > 0) {
    connection.query(sql3Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE3 experts')
      } else {
        let ctc = []
        for (let i = 0; i < sqlData3.length; i++) {
          ctc.push([id, sqlData3[i]])
        }
        connection.query(sql3Post, [ctc], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST3 experts')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }

  /********************** SQLDATA4 - SERVICE ******************/
  if (sqlData4.length > 0) {
    connection.query(sql4Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE4 experts')
      } else {
        let svc = []
        for (let i = 0; i < sqlData4.length; i++) {
          svc.push([id, sqlData4[i]])
        }
        connection.query(sql4Post, [svc], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST4 experts')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }

  console.log('resultEnd', resultEnd)
  res.send(resultEnd)
})

module.exports = clientsRouter
