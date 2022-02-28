const expertsRouter = require('express').Router()
const connection = require('../config/db.js')

expertsRouter.get('/', (req, res) => {
  let sql =
    "SELECT e.numExpert, e.firstname, e.lastname, e.phone, e.email, e.linkedinProfile, koe.kindOfExpertName, p.practiceType, el.expertiseLevelName, c.companyName,  e.price, e.cost, e.keywords, jt.jobTitleName, e.feedbackExpert, (SELECT ehp.answer WHERE projects.status_id != 3) AS answer, (SELECT projects.projectTitle WHERE projects.status_id != 3) AS projet, (SELECT ehp.preferedItwDay WHERE projects.status_id != 3) AS itwday, group_concat(DISTINCT la.languagesName SEPARATOR ' , ') AS languages, group_concat(DISTINCT company.companyName SEPARATOR ' , ') AS pastCompanies, group_concat(DISTINCT  ct.contactTypeName SEPARATOR ' , ') AS  contact, group_concat(DISTINCT  ge.geoExpertiseName SEPARATOR ' , ') AS  geoExpertiseName FROM experts AS e LEFT JOIN experts_has_contacttype AS ect ON ect.experts_id = e.id LEFT JOIN contactType AS ct ON ect.contacttype_id = ct.id LEFT JOIN kindofexpert AS koe ON e.kindOfExpert_id = koe.id LEFT JOIN practice AS p ON e.practice_id = p.id LEFT JOIN expertiselevel AS el ON e.expertiseLevel_id = el.id LEFT JOIN company AS c ON e.company_id = c.id LEFT JOIN experts_has_geoexpertise AS ege ON ege.experts_id = e.id LEFT JOIN geoexpertise AS ge ON ege.geoExpertise_id = ge.id LEFT JOIN experts_has_languages AS ela ON ela.experts_id = e.id LEFT JOIN languages AS la ON ela.languages_id = la.id LEFT JOIN past_companies AS pc ON pc.experts_id = e.id LEFT JOIN company ON pc.pastCompany_id = company.id LEFT JOIN jobtitle AS jt ON e.jobtitle_id = jt.id LEFT JOIN experts_has_projects AS ehp ON ehp.experts_id = e.id LEFT JOIN projects ON ehp.projects_id = projects.id WHERE e.numExpert IN (SELECT e.numExpert FROM experts AS e) GROUP BY e.numExpert"
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting experts')
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = expertsRouter
