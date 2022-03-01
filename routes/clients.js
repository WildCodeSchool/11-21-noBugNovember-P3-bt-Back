const clientsRouter = require('express').Router()
const connection = require('../config/db.js')

clientsRouter.get('/', (req, res) => {
  let sql =
    'SELECT cl.firstname, cl.lastname, cl.email, cl.phone, cl.city, cl.feedbackclient, cl.numClients, ct.companyTypeName, c.companyName, group_concat(DISTINCT cty.contactTypeName) AS contactType, group_concat(DISTINCT l.languagesName) AS languages,group_concat(DISTINCT se.serviceName) AS service FROM clients AS cl INNER JOIN companytype AS ct ON ct.id = cl.companyType_id INNER JOIN company AS c ON c.id = cl.company_id INNER JOIN clients_has_contacttype ON cl.id = clients_has_contacttype.clients_id INNER JOIN contacttype AS cty ON cty.id = clients_has_contacttype.contactType_id INNER JOIN clients_has_languages ON cl.id = clients_has_languages.clients_id INNER JOIN languages AS l ON l.id = clients_has_languages.languages_id INNER JOIN clients_has_service ON cl.id = clients_has_service.clients_id INNER JOIN service AS se ON se.id = clients_has_service.service_id GROUP BY cl.id'
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting GET clients')
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = clientsRouter
