const projectsRouter = require('express').Router()
const connection = require('../config/db.js')

//num project, linkedin keyword, quantity expert, type of expert, totalprice, dates
projectsRouter.get('/minicard', (req, res) => {
  let sql =
    'SELECT p.id,p.numProject, p.totalPrice, p.itwStart, p.itwDeadline, p.quantityExpert, s.status, group_concat(DISTINCT k.kindOfExpertName) AS kindOfExpert, group_concat(DISTINCT lk.linkedinKey) AS linkedin FROM projects AS p INNER JOIN status AS s ON s.id=p.status_id INNER JOIN kindofexpert_has_projects ON p.id = kindofexpert_has_projects.projects_id INNER JOIN kindofexpert AS k ON k.id = kindofexpert_has_projects.kindOfExpert_id INNER JOIN linkedinkeywords_has_projects ON p.id = linkedinkeywords_has_projects.projects_id INNER JOIN linkedinkeywords AS lk ON lk.id = linkedinkeywords_has_projects.linkedinKeywords_id GROUP BY p.projectTitle'
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting projects')
    } else {
      res.status(200).json(result)
    }
  })
})

//project title, num project, linkedin keyword, quantity expert, type of expert, totalprice, dates, industry, job title, function, expertiselevel, companies example, companies excluded, geo expertise, languages
projectsRouter.get('/midicard/:id', (req, res) => {
  let sql =
    'SELECT p.id, p.projectTitle, p.numProject, p.totalPrice, p.itwStart, p.itwDeadline, p.quantityExpert, s.status, el.expertiseLevelName, group_concat(DISTINCT k.kindOfExpertName) AS kindOfExpert, group_concat(DISTINCT i.industryName) AS industry, group_concat(DISTINCT rc.companyName) AS recommend_company, group_concat(DISTINCT ec.companyName) AS exclude_company, group_concat(DISTINCT j.jobTitleName) AS jobTitle, group_concat(DISTINCT f.fonctionName) AS fonction, group_concat(DISTINCT g.geoExpertiseName) AS geoExpertise, group_concat(DISTINCT l.languagesName) AS languages, group_concat(DISTINCT lk.linkedinKey) AS linkedin FROM projects AS p LEFT JOIN status AS s ON s.id=p.status_id LEFT JOIN expertiselevel AS el ON el.id = p.expertiseLevel_id LEFT JOIN kindofexpert_has_projects ON p.id = kindofexpert_has_projects.projects_id LEFT JOIN kindofexpert AS k ON k.id = kindofexpert_has_projects.kindOfExpert_id LEFT JOIN projects_need_industry ON p.id = projects_need_industry.projects_id LEFT JOIN industry AS i ON i.id = projects_need_industry.industry_id LEFT JOIN projects_recommend_company ON p.id = projects_recommend_company.projects_id LEFT JOIN company AS rc ON rc.id = projects_recommend_company.company_id LEFT JOIN projects_exclude_company ON p.id = projects_exclude_company.projects_id LEFT JOIN company AS ec ON ec.id = projects_exclude_company.company_id LEFT JOIN projects_has_jobtitle ON p.id = projects_has_jobtitle.projects_id LEFT JOIN jobtitle AS j ON j.id = projects_has_jobtitle.jobTitle_id LEFT JOIN projects_need_fonction ON p.id = projects_need_fonction.projects_id LEFT JOIN fonction AS f ON f.id = projects_need_fonction.fonction_id LEFT JOIN projects_need_geoexpertise ON p.id = projects_need_geoexpertise.projects_id LEFT JOIN geoexpertise AS g ON g.id = projects_need_geoexpertise.geoExpertise_id LEFT JOIN languages_has_projects ON p.id = languages_has_projects.projects_id LEFT JOIN languages AS l ON l.id = languages_has_projects.languages_id LEFT JOIN linkedinkeywords_has_projects ON p.id = linkedinkeywords_has_projects.projects_id LEFT JOIN linkedinkeywords AS lk ON lk.id = linkedinkeywords_has_projects.linkedinKeywords_id WHERE p.id = ? GROUP BY p.projectTitle'
  const projectId = req.params.id
  connection.query(sql, [projectId], (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting projects')
    } else {
      res.status(200).json(result)
    }
  })
})

projectsRouter.get('/maxicard/:id', (req, res) => {
  let sql =
    'SELECT p.id, p.projectTitle, p.numProject, p.clientComment, p.totalPrice, p.itwStart, p.itwDeadline, p.quantityExpert, s.status, el.expertiseLevelName, group_concat(DISTINCT pt.projectTypeName) AS projectType,  group_concat(DISTINCT k.kindOfExpertName) AS kindOfExpert, group_concat(DISTINCT pr.practiceType) AS practice, group_concat(DISTINCT i.industryName) AS industry, group_concat(DISTINCT rc.companyName) AS recommend_company, group_concat(DISTINCT ec.companyName) AS exclude_company, group_concat(DISTINCT j.jobTitleName) AS jobTitle, group_concat(DISTINCT f.fonctionName) AS fonction, group_concat(DISTINCT g.geoExpertiseName) AS geoExpertise, group_concat(DISTINCT l.languagesName) AS languages, group_concat(DISTINCT lk.linkedinKey) AS linkedin FROM projects AS p INNER JOIN status AS s ON s.id=p.status_id INNER JOIN expertiselevel AS el ON el.id = p.expertiseLevel_id INNER JOIN projects_has_projecttype ON p.id = projects_has_projecttype.projects_id INNER JOIN projecttype AS pt ON pt.id = projects_has_projecttype.projectType_id INNER JOIN kindofexpert_has_projects ON p.id = kindofexpert_has_projects.projects_id INNER JOIN kindofexpert AS k ON k.id = kindofexpert_has_projects.kindOfExpert_id INNER JOIN projects_has_practice ON p.id = projects_has_practice.projects_id INNER JOIN practice AS pr ON pr.id = projects_has_practice.practice_id INNER JOIN projects_need_industry ON p.id = projects_need_industry.projects_id INNER JOIN industry AS i ON i.id = projects_need_industry.industry_id LEFT JOIN projects_recommend_company ON p.id = projects_recommend_company.projects_id LEFT JOIN company AS rc ON rc.id = projects_recommend_company.company_id LEFT JOIN projects_exclude_company ON p.id = projects_exclude_company.projects_id LEFT JOIN company AS ec ON ec.id = projects_exclude_company.company_id INNER JOIN projects_has_jobtitle ON p.id = projects_has_jobtitle.projects_id INNER JOIN jobtitle AS j ON j.id = projects_has_jobtitle.jobTitle_id INNER JOIN projects_need_fonction ON p.id = projects_need_fonction.projects_id INNER JOIN fonction AS f ON f.id = projects_need_fonction.fonction_id INNER JOIN projects_need_geoexpertise ON p.id = projects_need_geoexpertise.projects_id INNER JOIN geoexpertise AS g ON g.id = projects_need_geoexpertise.geoExpertise_id INNER JOIN languages_has_projects ON p.id = languages_has_projects.projects_id INNER JOIN languages AS l ON l.id = languages_has_projects.languages_id INNER JOIN linkedinkeywords_has_projects ON p.id = linkedinkeywords_has_projects.projects_id INNER JOIN linkedinkeywords AS lk ON lk.id = linkedinkeywords_has_projects.linkedinKeywords_id WHERE p.id = ? GROUP BY p.projectTitle'
  const projectId = req.params.id
  connection.query(sql, [projectId], (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting projects')
    } else {
      res.status(200).json(result)
    }
  })
})

projectsRouter.post('/', (req, res) => {
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
    service_id,
    itwStart,
    itwDeadline,
    projectTitle,
    quantityExpert,
    clientComment,
    totalPrice,
    numProject,
    status_id,
    expertiseLevel_id,
    client_id,
    jobTitle_id,
    practice_id,
    projectType_id,
    fonction_id,
    geoExpertise_id,
    industry_id,
    projectTypeName
  } = req.body

  let datas = [
    itwStart,
    itwDeadline,
    projectTitle,
    quantityExpert,
    clientComment,
    totalPrice,
    numProject,
    status_id,
    expertiseLevel_id,
    client_id
  ]

  let sql =
    'INSERT INTO projects (itwStart, itwDeadline , projectTitle, quantityExpert, clientComment, totalPrice, numProject, status_id, expertiseLevel_id, client_id) VALUES (?,?,?,?,?,?,?,?,?,?);'
  let sql2 =
    'INSERT INTO projects_exclude_company (company_id, projects_id) VALUES (?,?);'
  let sql3 =
    'INSERT INTO projects_has_jobtitle (projects_id, jobTitle_id) VALUES (?,?);'
  let sql4 =
    'INSERT INTO projects_has_practice (projects_id, practice_id) VALUES (?,?);'
  let sql5 =
    'INSERT INTO projects_has_projecttype (projects_id, projectType_id) VALUES (?,?);'
  let sql6 =
    'INSERT INTO projects_need_fonction (fonction_id, projects_id) VALUES (?,?);'
  let sql7 =
    'INSERT INTO projects_need_geoexpertise (geoExpertise_id, projects_id) VALUES (?,?);'
  let sql8 =
    'INSERT INTO projects_need_industry (industry_id, projects_id) VALUES (?,?);'
  let sql9 =
    'INSERT INTO projects_recommend_company (company_id, projects_id) VALUES (?,?);'
  let sql10 = 'INSERT INTO projecttype (projectTypeName) VALUES (?);'

  connection.query(sql, datas, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting POST projects')
    } else {
      const id = result.insertId
      let datas2 = [id, company_id]
      connection.query(sql2, datas2, (err, result) => {
        if (err) {
          console.error(err)
          res.status(500).send('Error requesting POST2 projects')
        } else {
          let datas3 = [id, jobTitle_id]
          connection.query(sql3, datas3, (err, result) => {
            if (err) {
              console.error(err)
              res.status(500).send('Error requesting POST3 projects')
            } else {
              let datas4 = [id, practice_id]
              connection.query(sql4, datas4, (err, result) => {
                if (err) {
                  console.error(err)
                  res.status(500).send('Error requesting POST4 projects')
                } else {
                  let datas5 = [id, projectType_id]
                  connection.query(sql5, datas5, (err, result) => {
                    if (err) {
                      console.error(err)
                      res.status(500).send('Error requesting POST5 projects')
                    } else {
                      let datas6 = [id, fonction_id]
                      connection.query(sql6, datas6, (err, result) => {
                        if (err) {
                          console.error(err)
                          res
                            .status(500)
                            .send('Error requesting POST6 projects')
                        } else {
                          let datas7 = [id, geoExpertise_id]
                          connection.query(sql7, datas7, (err, result) => {
                            if (err) {
                              console.error(err)
                              res
                                .status(500)
                                .send('Error requesting POST7 projects')
                            } else {
                              let datas8 = [id, industry_id]
                              connection.query(sql8, datas8, (err, result) => {
                                if (err) {
                                  console.error(err)
                                  res
                                    .status(500)
                                    .send('Error requesting POST8 projects')
                                } else {
                                  let datas9 = [id, company_id]
                                  connection.query(
                                    sql9,
                                    datas9,
                                    (err, result) => {
                                      if (err) {
                                        console.error(err)
                                        res
                                          .status(500)
                                          .send(
                                            'Error requesting POST9 projects'
                                          )
                                      } else {
                                        let datas10 = [id, projectTypeName]
                                        connection.query(
                                          sql10,
                                          datas10,
                                          (err, result) => {
                                            if (err) {
                                              console.error(err)
                                              res
                                                .status(500)
                                                .send(
                                                  'Error requesting POST10 projects'
                                                )
                                            } else {
                                              res.status(200).json(result)
                                            }
                                          }
                                        )
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

module.exports = projectsRouter
