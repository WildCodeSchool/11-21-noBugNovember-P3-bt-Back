const expertsRouter = require('express').Router()
const connection = require('../config/db.js')

expertsRouter.get('/', (req, res) => {
  let sql =
    "SELECT e.numExpert, e.firstname, e.lastname, e.phone, e.email, e.linkedinProfile, koe.kindOfExpertName, p.practiceType, el.expertiseLevelName, c.companyName,  e.price, e.cost, e.keywords, jt.jobTitleName, e.feedbackExpert, (SELECT ehp.answer WHERE projects.status_id != 3) AS answer, (SELECT projects.projectTitle WHERE projects.status_id != 3) AS projet, (SELECT ehp.preferedItwDay WHERE projects.status_id != 3) AS itwday, group_concat(DISTINCT la.languagesName SEPARATOR ' , ') AS languages, group_concat(DISTINCT company.companyName SEPARATOR ' , ') AS pastCompanies, group_concat(DISTINCT  ct.contactTypeName SEPARATOR ' , ') AS  contact, group_concat(DISTINCT  ge.geoExpertiseName SEPARATOR ' , ') AS  geoExpertiseName FROM experts AS e LEFT JOIN experts_has_contacttype AS ect ON ect.experts_id = e.id LEFT JOIN contactType AS ct ON ect.contacttype_id = ct.id LEFT JOIN kindofexpert AS koe ON e.kindOfExpert_id = koe.id LEFT JOIN practice AS p ON e.practice_id = p.id LEFT JOIN expertiselevel AS el ON e.expertiseLevel_id = el.id LEFT JOIN company AS c ON e.company_id = c.id LEFT JOIN experts_has_geoexpertise AS ege ON ege.experts_id = e.id LEFT JOIN geoexpertise AS ge ON ege.geoExpertise_id = ge.id LEFT JOIN experts_has_languages AS ela ON ela.experts_id = e.id LEFT JOIN languages AS la ON ela.languages_id = la.id LEFT JOIN past_companies AS pc ON pc.experts_id = e.id LEFT JOIN company ON pc.pastCompany_id = company.id LEFT JOIN jobtitle AS jt ON e.jobtitle_id = jt.id LEFT JOIN experts_has_projects AS ehp ON ehp.experts_id = e.id LEFT JOIN projects ON ehp.projects_id = projects.id WHERE e.numExpert IN (SELECT e.numExpert FROM experts AS e) GROUP BY e.numExpert"
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting GET experts')
    } else {
      res.status(200).json(result)
    }
  })
})

expertsRouter.get('/form', (req, res) => {
  let sqllan = 'SELECT la.languagesName FROM languages AS la;'
  let sqlgeo = 'SELECT geo.geoExpertiseName FROM geoexpertise AS geo;'
  let sqlkoe = 'SELECT koe.kindOfExpertName FROM kindofexpert AS koe; '
  let sqlel = 'SELECT el.expertiseLevelName FROM expertiselevel AS el;'
  let sqlpr = 'SELECT pr.practiceType FROM practice AS pr;'
  let sqljob = 'SELECT job.jobTitleName FROM jobtitle AS job;'
  let languages = []
  let geoExpertise = []
  let kindOfExpert = []
  let expertiseLevel = []
  let practice = []
  let jobTitle = []

  connection.query(sqllan, (errlan, resultlan) => {
    if (errlan) {
      console.error(errlan)
      res.status(500).send('Error retrieving form datas')
    } else {
      resultlan.forEach(la =>
        languages.push({ value: la.languagesName, label: la.languagesName })
      )
      connection.query(sqlgeo, (errgeo, resultgeo) => {
        if (errgeo) {
          console.error(errgeo)
        } else {
          resultgeo.forEach(geo =>
            geoExpertise.push({
              value: geo.geoExpertiseName,
              label: geo.geoExpertiseName
            })
          )
          connection.query(sqlkoe, (errkoe, resultkoe) => {
            if (errkoe) {
              console.error(errkoe)
            } else {
              resultkoe.forEach(koe =>
                kindOfExpert.push({
                  value: koe.kindOfExpertName,
                  label: koe.kindOfExpertName
                })
              )
              connection.query(sqlel, (errel, resultel) => {
                if (errel) {
                  console.error(errel)
                } else {
                  resultel.forEach(el =>
                    expertiseLevel.push({
                      value: el.expertiseLevelName,
                      label: el.expertiseLevelName
                    })
                  )
                  connection.query(sqlpr, (errpr, resultpr) => {
                    if (errpr) {
                      console.error(errpr)
                    } else {
                      resultpr.forEach(pr =>
                        practice.push({
                          value: pr.practiceType,
                          label: pr.practiceType
                        })
                      )
                      connection.query(sqljob, (errjob, resultjob) => {
                        if (errjob) {
                          console.error(errjob)
                        } else {
                          resultjob.forEach(job =>
                            jobTitle.push({
                              value: job.jobTitleName,
                              label: job.jobTitleName
                            })
                          )
                          const options = {
                            languages: [...languages],
                            geoExpertise: [...geoExpertise],
                            kindOfExpert: [...kindOfExpert],
                            expertiseLevel: [...expertiseLevel],
                            practice: [...practice],
                            jobTitle: [...jobTitle]
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
    }
  })
})

expertsRouter.post('/test', (req, res) => {
  console.log('body', req.body)
  const {
    firstname,
    lastname,
    email,
    phone,
    company_id,
    linkedinProfile,
    price,
    numExpert,
    kindOfExpert_id,
    practice_id,
    contries_id,
    expertiseLevel_id,
    feedbackExpert,
    expertscol,
    cost,
    keywords,
    jobtitle_id,
    languages_id,
    pastCompany_id,
    contactType_id,
    geoExpertise
  } = req.body
  console.log('geoExpertise', geoExpertise)
  console.log('firstname', firstname)
})

expertsRouter.post('/', (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    company_id,
    linkedinProfile,
    price,
    numExpert,
    kindOfExpert_id,
    practice_id,
    contries_id,
    expertiseLevel_id,
    feedbackExpert,
    expertscol,
    cost,
    keywords,
    jobtitle_id,
    languages_id,
    pastCompany_id,
    contactType_id,
    geoExpertise_id
  } = req.body

  let datas = [
    firstname,
    lastname,
    email,
    phone,
    company_id,
    linkedinProfile,
    price,
    numExpert,
    kindOfExpert_id,
    practice_id,
    contries_id,
    expertiseLevel_id,
    feedbackExpert,
    expertscol,
    cost,
    keywords,
    jobtitle_id
  ]

  let sql =
    'INSERT INTO experts (firstname, lastname, email, phone, company_id, linkedinProfile, price, numExpert, kindOfExpert_id, practice_id, contries_id, expertiseLevel_id, feedbackExpert, expertscol, cost, keywords, jobtitle_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  let sql2 =
    'INSERT INTO experts_has_languages (experts_id, languages_id) VALUES (?, ?);'
  let sql3 =
    'INSERT INTO past_companies (experts_id, pastCompany_id) VALUES (?, ?);'
  let sql4 =
    'INSERT INTO experts_has_contacttype (experts_id, contactType_id) VALUES (?, ?);'
  let sql5 =
    'INSERT INTO experts_has_geoexpertise (experts_id, geoExpertise_id) VALUES (?, ?);'
  connection.query(sql, datas, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting POST experts')
    } else {
      const id = result.insertId
      let datas2 = [id, languages_id]
      connection.query(sql2, datas2, (err, result) => {
        if (err) {
          console.error(err)
          res.status(500).send('Error requesting POST2 experts')
        } else {
          let datas3 = [id, pastCompany_id]
          connection.query(sql3, datas3, (err, result) => {
            if (err) {
              console.error(err)
              res.status(500).send('Error requesting POST3 experts')
            } else {
              let datas4 = [id, contactType_id]
              connection.query(sql4, datas4, (err, result) => {
                if (err) {
                  console.error(err)
                  res.status(500).send('Error requesting POST4 experts')
                } else {
                  let datas5 = [id, geoExpertise_id]
                  connection.query(sql5, datas5, (err, result) => {
                    if (err) {
                      console.error(err)
                      res.status(500).send('Error requesting POST5 experts')
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
    }
  })
})

module.exports = expertsRouter
