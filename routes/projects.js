const projectsRouter = require('express').Router()
const connection = require('../config/db.js')

//num project, linkedin keyword, quantity expert, type of expert, totalprice, dates
projectsRouter.get('/minicard', (req, res) => {
  let sql =
    'SELECT p.id,p.numProject,p.itwStart, p.itwDeadline, p.quantityExpert, s.status, group_concat(DISTINCT k.kindOfExpertName) AS kindOfExpert, group_concat(DISTINCT i.industryName) AS industry, group_concat(DISTINCT lk.linkedinKey) AS linkedin FROM projects AS p INNER JOIN status AS s ON s.id=p.status_id INNER JOIN kindofexpert_has_projects ON p.id = kindofexpert_has_projects.projects_id INNER JOIN kindofexpert AS k ON k.id = kindofexpert_has_projects.kindOfExpert_id INNER JOIN linkedinkeywords_has_projects ON p.id = linkedinkeywords_has_projects.projects_id INNER JOIN linkedinkeywords AS lk ON lk.id = linkedinkeywords_has_projects.linkedinKeywords_id LEFT JOIN projects_need_industry ON p.id = projects_need_industry.projects_id LEFT JOIN industry AS i ON i.id = projects_need_industry.industry_id GROUP BY p.projectTitle'
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

// rajouter service has projects
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

// rajouter service
projectsRouter.get('/form', (req, res) => {
  let sqllan = 'SELECT id, languagesName FROM languages;'
  let sqlgeo = 'SELECT id, geoExpertiseName FROM geoexpertise;'
  let sqlkoe = 'SELECT id, kindOfExpertName FROM kindofexpert; '
  let sqlel = 'SELECT id, expertiseLevelName FROM expertiselevel;'
  let sqlpr = 'SELECT id, practiceType FROM practice;'
  let sqljob = 'SELECT id, jobTitleName FROM jobtitle;'
  let sqlind = 'SELECT id, industryName FROM industry;'
  let sqlpt = 'SELECT id, projectTypeName FROM projecttype;'
  let sqlfon = 'SELECT id, fonctionName FROM fonction;'
  let sqllin = 'SELECT id, linkedinKey FROM linkedinkeywords'
  let sqlst = 'SELECT id, status FROM status;'
  let sqlcom = 'SELECT id, companyName FROM company;'
  let sqlcl = 'SELECT id, numClients FROM clients'
  let sqlse = 'SELECT id, serviceName FROM service'
  let languages = []
  let geoExpertise = []
  let kindOfExpert = []
  let expertiseLevel = []
  let practice = []
  let jobTitle = []
  let industry = []
  let projectType = []
  let fonction = []
  let linkedin = []
  let status = []
  let company = []
  let client = []
  let service = []

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
                          connection.query(sqlind, (errind, resultind) => {
                            if (errind) {
                              console.error(errind)
                            } else {
                              resultind.forEach(ind =>
                                industry.push({
                                  id: ind.id,
                                  value: ind.industryName,
                                  label: ind.industryName
                                })
                              )
                              connection.query(sqlpt, (errpt, resultpt) => {
                                if (errpt) {
                                  console.error(errpt)
                                } else {
                                  resultpt.forEach(pt =>
                                    projectType.push({
                                      id: pt.id,
                                      value: pt.projectTypeName,
                                      label: pt.projectTypeName
                                    })
                                  )
                                  connection.query(
                                    sqlfon,
                                    (errfon, resultfon) => {
                                      if (errfon) {
                                        console.error(errfon)
                                      } else {
                                        resultfon.forEach(fon =>
                                          fonction.push({
                                            id: fon.id,
                                            value: fon.fonctionName,
                                            label: fon.fonctionName
                                          })
                                        )
                                        connection.query(
                                          sqllin,
                                          (errlin, resultlin) => {
                                            if (errlin) {
                                              console.error(errlin)
                                            } else {
                                              resultlin.forEach(lin =>
                                                linkedin.push({
                                                  id: lin.id,
                                                  value: lin.linkedinKey,
                                                  label: lin.linkedinKey
                                                })
                                              )
                                              connection.query(
                                                sqlst,
                                                (errst, resultst) => {
                                                  if (errst) {
                                                    console.error(errst)
                                                  } else {
                                                    resultst.forEach(st =>
                                                      status.push({
                                                        id: st.id,
                                                        value: st.status,
                                                        label: st.status
                                                      })
                                                    )
                                                    connection.query(
                                                      sqlcom,
                                                      (errcom, resultcom) => {
                                                        if (errcom) {
                                                          console.error(errcom)
                                                        } else {
                                                          resultcom.forEach(
                                                            com =>
                                                              company.push({
                                                                id: com.id,
                                                                value:
                                                                  com.companyName,
                                                                label:
                                                                  com.companyName
                                                              })
                                                          )
                                                          connection.query(
                                                            sqlcl,
                                                            (
                                                              errcl,
                                                              resultcl
                                                            ) => {
                                                              if (errcl) {
                                                                console.error(
                                                                  errcl
                                                                )
                                                              } else {
                                                                resultcl.forEach(
                                                                  cl =>
                                                                    client.push(
                                                                      {
                                                                        id: cl.id,
                                                                        value:
                                                                          cl.numClients,
                                                                        label:
                                                                          cl.numClients
                                                                      }
                                                                    )
                                                                )
                                                                connection.query(
                                                                  sqlse,
                                                                  (
                                                                    errse,
                                                                    resultse
                                                                  ) => {
                                                                    if (errse) {
                                                                      console.error(
                                                                        errse
                                                                      )
                                                                    } else {
                                                                      resultse.forEach(
                                                                        se =>
                                                                          service.push(
                                                                            {
                                                                              id: se.id,
                                                                              value:
                                                                                se.serviceName,
                                                                              label:
                                                                                se.serviceName
                                                                            }
                                                                          )
                                                                      )
                                                                      const options =
                                                                        {
                                                                          languages:
                                                                            [
                                                                              ...languages
                                                                            ],
                                                                          geoExpertise:
                                                                            [
                                                                              ...geoExpertise
                                                                            ],
                                                                          kindOfExpert:
                                                                            [
                                                                              ...kindOfExpert
                                                                            ],
                                                                          expertiseLevel:
                                                                            [
                                                                              ...expertiseLevel
                                                                            ],
                                                                          practice:
                                                                            [
                                                                              ...practice
                                                                            ],
                                                                          jobTitle:
                                                                            [
                                                                              ...jobTitle
                                                                            ],
                                                                          industry:
                                                                            [
                                                                              ...industry
                                                                            ],
                                                                          projectType:
                                                                            [
                                                                              ...projectType
                                                                            ],
                                                                          fonction:
                                                                            [
                                                                              ...fonction
                                                                            ],
                                                                          linkedin:
                                                                            [
                                                                              ...linkedin
                                                                            ],
                                                                          status:
                                                                            [
                                                                              ...status
                                                                            ],
                                                                          company:
                                                                            [
                                                                              ...company
                                                                            ],
                                                                          client:
                                                                            [
                                                                              ...client
                                                                            ],
                                                                          service:
                                                                            [
                                                                              ...service
                                                                            ]
                                                                        }
                                                                      res
                                                                        .status(
                                                                          200
                                                                        )
                                                                        .json(
                                                                          options
                                                                        )
                                                                    }
                                                                  }
                                                                )
                                                              }
                                                            }
                                                          )
                                                        }
                                                      }
                                                    )
                                                  }
                                                }
                                              )
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

projectsRouter.post('/test', (req, res) => {
  const { table, column, value } = req.body
  let sql = `INSERT INTO ${table} (${column}) VALUE (?);`
  connection.query(sql, value, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting POST projects')
    } else {
      const id = result.insertId
      const newItem = { id: id, value: value, label: value }
      res.status(200).json(newItem)
    }
  })
})

projectsRouter.post('/', (req, res) => {
  const {
    clientComment,
    client_id,
    exampleCompany_id,
    excludedCompany_id,
    expertiseLevel_id,
    fonction_id,
    geoExpertise_id,
    industry_id,
    itwDeadline,
    itwStart,
    jobTitle_id,
    kindOfExpert_id,
    languages_id,
    linkedinKeywords_id,
    numProject,
    practice_id,
    projectTitle,
    projectType_id,
    quantityExpert,
    service_id,
    status_id,
    totalPrice
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

  // insert datas in projects
  let sql =
    'INSERT INTO projects (itwStart, itwDeadline , projectTitle, quantityExpert, clientComment, totalPrice, numProject, status_id, expertiseLevel_id, client_id) VALUES (?,?,?,?,?,?,?,?,?,?);'

  // insert datas in many to many where first values are pre-determined
  let sql2 =
    'INSERT INTO projects_has_practice (practice_id, projects_id) VALUES ?;'

  // insert datas in many to many where new first values can be created
  let sql3 =
    'INSERT INTO projects_exclude_company (company_id, projects_id) VALUES ?;'
  let sql4 =
    'INSERT INTO projects_need_fonction (fonction_id, projects_id) VALUES ?;'
  let sql5 =
    'INSERT INTO projects_need_geoexpertise (geoExpertise_id, projects_id) VALUES ?;'
  let sql6 =
    'INSERT INTO projects_need_industry (industry_id, projects_id) VALUES ?;'
  let sql7 =
    'INSERT INTO projects_has_jobtitle (jobTitle_id, projects_id) VALUES ?;'
  let sql8 =
    'INSERT INTO kindofexpert_has_projects (kindOfExpert_id, projects_id) VALUES ?;'
  let sql9 =
    'INSERT INTO languages_has_projects (languages_id, projects_id) VALUES ?;'
  let sql10 =
    'INSERT INTO linkedinkeywords_has_projects (linkedinKeywords_id, projects_id) VALUES ?;'
  let sql11 =
    'INSERT INTO projects_has_projecttype (projectType_id, projects_id) VALUES ?;'
  let sql12 =
    'INSERT INTO projects_recommend_company (company_id, projects_id) VALUES ?;'
  let sql13 =
    'INSERT INTO service_has_projects (service_id, projects_id) VALUES ?;'

  connection.query(sql, datas, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting POST projects')
    } else {
      const id = result.insertId
      let pra = []
      for (let i = 0; i < practice_id.length; i++) {
        pra.push([practice_id[i], id])
      }
      connection.query(sql2, [pra], (err, result) => {
        if (err) {
          console.error(err)
          res.status(500).send('Error requesting POST2 projects')
        } else {
          let ecie = []
          for (let i = 0; i < excludedCompany_id.length; i++) {
            ecie.push([excludedCompany_id[i], id])
          }
          connection.query(sql3, [ecie], (err, result) => {
            if (err) {
              console.error(err)
              res.status(500).send('Error requesting POST3 projects')
            } else {
              let fon = []
              for (let i = 0; i < fonction_id.length; i++) {
                fon.push([fonction_id[i], id])
              }
              connection.query(sql4, [fon], (err, result) => {
                if (err) {
                  console.error(err)
                  res.status(500).send('Error requesting POST4 projects')
                } else {
                  let geo = []
                  for (let i = 0; i < geoExpertise_id.length; i++) {
                    geo.push([geoExpertise_id[i], id])
                  }
                  connection.query(sql5, [geo], (err, result) => {
                    if (err) {
                      console.error(err)
                      res.status(500).send('Error requesting POST5 projects')
                    } else {
                      let ind = []
                      for (let i = 0; i < industry_id.length; i++) {
                        ind.push([industry_id[i], id])
                      }
                      connection.query(sql6, [ind], (err, result) => {
                        if (err) {
                          console.error(err)
                          res
                            .status(500)
                            .send('Error requesting POST6 projects')
                        } else {
                          let job = []
                          for (let i = 0; i < jobTitle_id.length; i++) {
                            job.push([jobTitle_id[i], id])
                          }
                          connection.query(sql7, [job], (err, result) => {
                            if (err) {
                              console.error(err)
                              res
                                .status(500)
                                .send('Error requesting POST7 projects')
                            } else {
                              let koe = []
                              for (let i = 0; i < kindOfExpert_id.length; i++) {
                                koe.push([kindOfExpert_id[i], id])
                              }
                              connection.query(sql8, [koe], (err, result) => {
                                if (err) {
                                  console.error(err)
                                  res
                                    .status(500)
                                    .send('Error requesting POST8 projects')
                                } else {
                                  let lan = []
                                  for (
                                    let i = 0;
                                    i < languages_id.length;
                                    i++
                                  ) {
                                    lan.push([languages_id[i], id])
                                  }
                                  connection.query(
                                    sql9,
                                    [lan],
                                    (err, result) => {
                                      if (err) {
                                        console.error(err)
                                        res
                                          .status(500)
                                          .send(
                                            'Error requesting POST9 projects'
                                          )
                                      } else {
                                        let lin = []
                                        for (
                                          let i = 0;
                                          i < linkedinKeywords_id.length;
                                          i++
                                        ) {
                                          lin.push([linkedinKeywords_id[i], id])
                                        }
                                        connection.query(
                                          sql10,
                                          [lin],
                                          (err, result) => {
                                            if (err) {
                                              console.error(err)
                                              res
                                                .status(500)
                                                .send(
                                                  'Error requesting POST10 projects'
                                                )
                                            } else {
                                              let pt = []
                                              for (
                                                let i = 0;
                                                i < projectType_id.length;
                                                i++
                                              ) {
                                                pt.push([projectType_id[i], id])
                                              }
                                              connection.query(
                                                sql11,
                                                [pt],
                                                (err, result) => {
                                                  if (err) {
                                                    console.error(err)
                                                    res
                                                      .status(500)
                                                      .send(
                                                        'Error requesting POST11 projects'
                                                      )
                                                  } else {
                                                    let ecie = []
                                                    for (
                                                      let i = 0;
                                                      i <
                                                      exampleCompany_id.length;
                                                      i++
                                                    ) {
                                                      ecie.push([
                                                        exampleCompany_id[i],
                                                        id
                                                      ])
                                                    }
                                                    connection.query(
                                                      sql12,
                                                      [ecie],
                                                      (err, result) => {
                                                        if (err) {
                                                          console.error(err)
                                                          res
                                                            .status(500)
                                                            .send(
                                                              'Error requesting POST12 projects'
                                                            )
                                                        } else {
                                                          let se = []
                                                          for (
                                                            let i = 0;
                                                            i <
                                                            service_id.length;
                                                            i++
                                                          ) {
                                                            se.push([
                                                              service_id[i],
                                                              id
                                                            ])
                                                          }
                                                          connection.query(
                                                            sql13,
                                                            [se],
                                                            (err, result) => {
                                                              if (err) {
                                                                console.error(
                                                                  err
                                                                )
                                                                res
                                                                  .status(500)
                                                                  .send(
                                                                    'Error requesting POST13 projects'
                                                                  )
                                                              } else {
                                                                res.status(200)
                                                                  .json
                                                              }
                                                            }
                                                          )
                                                        }
                                                      }
                                                    )
                                                  }
                                                }
                                              )
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
