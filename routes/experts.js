const expertsRouter = require('express').Router()
const connection = require('../config/db.js')

expertsRouter.get('/', (req, res) => {
  let sql =
    "SELECT e.id, e.numExpert, e.firstname, e.lastname, e.phone, e.email, e.linkedinProfile, koe.kindOfExpertName, p.practiceType, el.expertiseLevelName, c.companyName,  e.price, e.cost, e.keywords, jt.jobTitleName, e.feedbackExpert, (SELECT ehp.answer WHERE projects.status_id != 3) AS answer, (SELECT projects.projectTitle WHERE projects.status_id != 3) AS projet, (SELECT ehp.preferedItwDay WHERE projects.status_id != 3) AS itwday, group_concat(DISTINCT la.languagesName SEPARATOR ' , ') AS languages, group_concat(DISTINCT company.companyName SEPARATOR ' , ') AS pastCompanies, group_concat(DISTINCT  ct.contactTypeName SEPARATOR ' , ') AS  contact, group_concat(DISTINCT  ge.geoExpertiseName SEPARATOR ' , ') AS  geoExpertiseName FROM experts AS e LEFT JOIN experts_has_contacttype AS ect ON ect.experts_id = e.id LEFT JOIN contactType AS ct ON ect.contacttype_id = ct.id LEFT JOIN kindofexpert AS koe ON e.kindOfExpert_id = koe.id LEFT JOIN practice AS p ON e.practice_id = p.id LEFT JOIN expertiselevel AS el ON e.expertiseLevel_id = el.id LEFT JOIN company AS c ON e.company_id = c.id LEFT JOIN experts_has_geoexpertise AS ege ON ege.experts_id = e.id LEFT JOIN geoexpertise AS ge ON ege.geoExpertise_id = ge.id LEFT JOIN experts_has_languages AS ela ON ela.experts_id = e.id LEFT JOIN languages AS la ON ela.languages_id = la.id LEFT JOIN past_companies AS pc ON pc.experts_id = e.id LEFT JOIN company ON pc.pastCompany_id = company.id LEFT JOIN jobtitle AS jt ON e.jobtitle_id = jt.id LEFT JOIN experts_has_projects AS ehp ON ehp.experts_id = e.id LEFT JOIN projects ON ehp.projects_id = projects.id WHERE e.numExpert IN (SELECT e.numExpert FROM experts AS e) GROUP BY e.numExpert"
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
<<<<<<< HEAD
  let sqllan = 'SELECT la.languagesName FROM languages AS la;'
  let sqlgeo = 'SELECT geo.geoExpertiseName FROM geoexpertise AS geo;'
  let sqlkoe = 'SELECT koe.kindOfExpertName FROM kindofexpert AS koe; '
  let sqlel = 'SELECT el.expertiseLevelName FROM expertiselevel AS el;'
  let sqlpr = 'SELECT pr.practiceType FROM practice AS pr;'
  let sqljob = 'SELECT job.jobTitleName FROM jobtitle AS job;'
  let sqlcom = 'SELECT com.companyName FROM company AS com;'
=======
  console.log('test form')

  let sqllan = 'SELECT id,languagesName FROM languages;'
  let sqlgeo = 'SELECT id, geoExpertiseName FROM geoexpertise;'
  let sqlkoe = 'SELECT id, kindOfExpertName FROM kindofexpert; '
  let sqlel = 'SELECT id, expertiseLevelName FROM expertiselevel;'
  let sqlpr = 'SELECT id, practiceType FROM practice;'
  let sqljob = 'SELECT id, jobTitleName FROM jobtitle;'
  let sqlcie = 'SELECT id, companyName FROM company;'
  let sqlctc = 'SELECT id, contactTypeName FROM contacttype;'
  let sqlpjt = 'SELECT id, projectTitle FROM projects; '
>>>>>>> dev
  let languages = []
  let geoExpertise = []
  let kindOfExpert = []
  let expertiseLevel = []
  let practice = []
  let jobTitle = []
<<<<<<< HEAD
  let company = []
=======
  let companies = []
  let contactType = []
  let projects = []
>>>>>>> dev

  connection.query(sqllan, (errlan, resultlan) => {
    if (errlan) {
      console.error(errlan)
      res.status(500).send('Error retrieving form datas')
    } else {
      resultlan.forEach(la =>
        languages.push({
          id: la.id,
          value: la.languagesName,
          label: la.languagesName
        })
      )
      connection.query(sqlgeo, (errgeo, resultgeo) => {
        if (errgeo) {
          console.error(errgeo)
        } else {
          resultgeo.forEach(geo =>
            geoExpertise.push({
              id: geo.id,
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
                  id: koe.id,
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
                      id: el.id,
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
                          id: pr.id,
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
                              id: job.id,
                              value: job.jobTitleName,
                              label: job.jobTitleName
                            })
                          )
                          connection.query(sqlcie, (errcie, resultcie) => {
                            if (errcie) {
                              console.error(errcie)
                            } else {
                              resultcie.forEach(cie =>
                                companies.push({
                                  id: cie.id,
                                  value: cie.companyName,
                                  label: cie.companyName
                                })
                              )
                              connection.query(sqlctc, (errctc, resultctc) => {
                                if (errctc) {
                                  console.error(errctc)
                                } else {
                                  resultctc.forEach(ctc =>
                                    contactType.push({
                                      id: ctc.id,
                                      value: ctc.contactTypeName,
                                      label: ctc.contactTypeName
                                    })
                                  )
                                  connection.query(
                                    sqlpjt,
                                    (errpjt, resultpjt) => {
                                      if (errpjt) {
                                        console.error(errpjt)
                                      } else {
                                        resultpjt.forEach(pjt =>
                                          projects.push({
                                            id: pjt.id,
                                            value: pjt.projectTitle,
                                            label: pjt.projectTitle
                                          })
                                        )
                                        const options = {
                                          languages: [...languages],
                                          geoExpertise: [...geoExpertise],
                                          kindOfExpert: [...kindOfExpert],
                                          expertiseLevel: [...expertiseLevel],
                                          practice: [...practice],
                                          jobTitle: [...jobTitle],
                                          companies: [...companies],
                                          contactType: [...contactType],
                                          projects: [...projects]
                                        }
                                        res.status(200).json(options)
                                      }
                                    }
                                  )
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

expertsRouter.get('/form/:id', (req, res) => {
  let id = req.params.id
  let sql =
    "SELECT e.id, e.numExpert, e.firstname, e.lastname, e.phone, e.email, e.linkedinProfile, koe.kindOfExpertName, p.practiceType, el.expertiseLevelName, c.companyName,  e.price, e.cost, e.keywords, jt.jobTitleName, e.feedbackExpert, (SELECT ehp.answer WHERE projects.status_id != 3) AS answer, (SELECT projects.projectTitle WHERE projects.status_id != 3) AS projet, (SELECT ehp.preferedItwDay WHERE projects.status_id != 3) AS itwday, group_concat(DISTINCT la.languagesName SEPARATOR ' , ') AS languages, group_concat(DISTINCT company.companyName SEPARATOR ' , ') AS pastCompanies, group_concat(DISTINCT  ct.contactTypeName SEPARATOR ' , ') AS  contact, group_concat(DISTINCT  ge.geoExpertiseName SEPARATOR ' , ') AS  geoExpertiseName FROM experts AS e LEFT JOIN experts_has_contacttype AS ect ON ect.experts_id = e.id LEFT JOIN contactType AS ct ON ect.contacttype_id = ct.id LEFT JOIN kindofexpert AS koe ON e.kindOfExpert_id = koe.id LEFT JOIN practice AS p ON e.practice_id = p.id LEFT JOIN expertiselevel AS el ON e.expertiseLevel_id = el.id LEFT JOIN company AS c ON e.company_id = c.id LEFT JOIN experts_has_geoexpertise AS ege ON ege.experts_id = e.id LEFT JOIN geoexpertise AS ge ON ege.geoExpertise_id = ge.id LEFT JOIN experts_has_languages AS ela ON ela.experts_id = e.id LEFT JOIN languages AS la ON ela.languages_id = la.id LEFT JOIN past_companies AS pc ON pc.experts_id = e.id LEFT JOIN company ON pc.pastCompany_id = company.id LEFT JOIN jobtitle AS jt ON e.jobtitle_id = jt.id LEFT JOIN experts_has_projects AS ehp ON ehp.experts_id = e.id LEFT JOIN projects ON ehp.projects_id = projects.id WHERE e.numExpert IN (SELECT e.numExpert FROM experts AS e) AND e.id = ? GROUP BY e.numExpert "
  connection.query(sql, id, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting GET experts')
    } else {
      console.log('result', result)
      const id = result[0].id
      console.log('id', id)
      const company = [
        { value: result[0].companyName, label: result[0].companyName }
      ]
      console.log('company', result)
      const datas = { id: id, company: [...company] }
      console.log('datas', datas)
      res.status(200).json(datas)
    }
  })
})

expertsRouter.post('/test', (req, res) => {
  console.log('body', req.body)
  const { table, column, value } = req.body
  console.log(value)
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
    expertiseLevel_id,
    feedbackExpert,
    cost,
    keywords,
    jobtitle_id,
    languages_id,
    pastCompany_id,
    contactType_id,
    geoExpertise_id,
    projects_id
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
    expertiseLevel_id,
    feedbackExpert,
    cost,
    keywords,
    jobtitle_id
  ]

  let sql =
    'INSERT INTO experts (firstname, lastname, email, phone, company_id, linkedinProfile, price, numExpert, kindOfExpert_id, practice_id, expertiseLevel_id, feedbackExpert, cost, keywords, jobtitle_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  let sql2 =
    'INSERT INTO experts_has_languages (experts_id, languages_id) VALUES ?;'
  let sql3 = 'INSERT INTO past_companies (experts_id, pastCompany_id) VALUES ?;'
  let sql4 =
    'INSERT INTO experts_has_contacttype (experts_id, contactType_id) VALUES ?;'
  let sql5 =
    'INSERT INTO experts_has_geoexpertise (experts_id, geoExpertise_id) VALUES ?;'
  let sql6 =
    'INSERT INTO experts_has_projects (experts_id, projects_id) VALUES ?;'
  connection.query(sql, datas, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting POST experts')
    } else {
      const id = result.insertId
      let lan = []
      for (let i = 0; i < languages_id.length; i++) {
        lan.push([id, languages_id[i]])
      }
      connection.query(sql2, [lan], (err, result) => {
        if (err) {
          console.error(err)
          res.status(500).send('Error requesting POST2 experts')
        } else {
          let pcom = []
          for (let i = 0; i < pastCompany_id.length; i++) {
            pcom.push([id, pastCompany_id[i]])
          }
          connection.query(sql3, [pcom], (err, result) => {
            if (err) {
              console.error(err)
              res.status(500).send('Error requesting POST3 experts')
            } else {
              let ctc = []
              for (let i = 0; i < contactType_id.length; i++) {
                ctc.push([id, contactType_id[i]])
              }
              connection.query(sql4, [ctc], (err, result) => {
                if (err) {
                  console.error(err)
                  res.status(500).send('Error requesting POST4 experts')
                } else {
                  let geo = []
                  for (let i = 0; i < geoExpertise_id.length; i++) {
                    geo.push([id, geoExpertise_id[i]])
                  }
                  connection.query(sql5, [geo], (err, result) => {
                    if (err) {
                      console.error(err)
                      res.status(500).send('Error requesting POST5 experts')
                    } else {
                      let pjt = []
                      for (let i = 0; i < projects_id.length; i++) {
                        pjt.push([id, projects_id[i]])
                      }
                      connection.query(sql6, [pjt], (err, result) => {
                        if (err) {
                          console.error(err)
                          res.status(500).send('Error requesting POST6 experts')
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
    }
  })
})

module.exports = expertsRouter
