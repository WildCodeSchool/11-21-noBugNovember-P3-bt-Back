const projectsRouter = require('express').Router()
const connection = require('../config/db.js')

//id, num project, itw start, itw deadline, quantity expert, status, kind of expert industry, linkedin
projectsRouter.get('/minicard', (req, res) => {
  let sql =
    "SELECT p.id,p.numProject,p.itwStart, p.itwDeadline, p.quantityExpert, s.status, group_concat(DISTINCT k.kindOfExpertName SEPARATOR ', ') AS kindOfExpert, group_concat(DISTINCT i.industryName SEPARATOR ', ') AS industry, group_concat(DISTINCT lk.linkedinKey SEPARATOR ', ') AS linkedin FROM projects AS p LEFT JOIN status AS s ON s.id=p.status_id LEFT JOIN kindofexpert_has_projects ON p.id = kindofexpert_has_projects.projects_id LEFT JOIN kindofexpert AS k ON k.id = kindofexpert_has_projects.kindOfExpert_id LEFT JOIN linkedinkeywords_has_projects ON p.id = linkedinkeywords_has_projects.projects_id LEFT JOIN linkedinkeywords AS lk ON lk.id = linkedinkeywords_has_projects.linkedinKeywords_id LEFT JOIN projects_need_industry ON p.id = projects_need_industry.projects_id LEFT JOIN industry AS i ON i.id = projects_need_industry.industry_id WHERE p.id IN (SELECT p.id FROM projects AS p) GROUP BY p.id"
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting projects')
    } else {
      res.status(200).json(result)
    }
  })
})

//id, project title, num project, total price, itw start, itw deadline, quantity expert, status, expertiselevel, kind of expert, industry, recommend company, exclude company, job title, fonction, geo expertise, languages, linkedin
projectsRouter.get('/midicard/:id', (req, res) => {
  let sql =
    "SELECT p.id, p.projectTitle, p.numProject, p.totalPrice, p.itwStart, p.itwDeadline, p.quantityExpert, s.status, el.expertiseLevelName, group_concat(DISTINCT k.kindOfExpertName SEPARATOR ', ') AS kindOfExpert, group_concat(DISTINCT i.industryName SEPARATOR ', ') AS industry, group_concat(DISTINCT rc.companyName SEPARATOR ', ') AS recommend_company, group_concat(DISTINCT ec.companyName SEPARATOR ', ') AS exclude_company, group_concat(DISTINCT j.jobTitleName SEPARATOR ', ') AS jobTitle, group_concat(DISTINCT f.fonctionName SEPARATOR ', ') AS fonction, group_concat(DISTINCT g.geoExpertiseName SEPARATOR ', ') AS geoExpertise, group_concat(DISTINCT l.languagesName SEPARATOR ', ') AS languages, group_concat(DISTINCT lk.linkedinKey SEPARATOR ', ') AS linkedin FROM projects AS p LEFT JOIN status AS s ON s.id=p.status_id LEFT JOIN expertiselevel AS el ON el.id = p.expertiseLevel_id LEFT JOIN kindofexpert_has_projects ON p.id = kindofexpert_has_projects.projects_id LEFT JOIN kindofexpert AS k ON k.id = kindofexpert_has_projects.kindOfExpert_id LEFT JOIN projects_need_industry ON p.id = projects_need_industry.projects_id LEFT JOIN industry AS i ON i.id = projects_need_industry.industry_id LEFT JOIN projects_recommend_company ON p.id = projects_recommend_company.projects_id LEFT JOIN company AS rc ON rc.id = projects_recommend_company.company_id LEFT JOIN projects_exclude_company ON p.id = projects_exclude_company.projects_id LEFT JOIN company AS ec ON ec.id = projects_exclude_company.company_id LEFT JOIN projects_has_jobtitle ON p.id = projects_has_jobtitle.projects_id LEFT JOIN jobtitle AS j ON j.id = projects_has_jobtitle.jobTitle_id LEFT JOIN projects_need_fonction ON p.id = projects_need_fonction.projects_id LEFT JOIN fonction AS f ON f.id = projects_need_fonction.fonction_id LEFT JOIN projects_need_geoexpertise ON p.id = projects_need_geoexpertise.projects_id LEFT JOIN geoexpertise AS g ON g.id = projects_need_geoexpertise.geoExpertise_id LEFT JOIN languages_has_projects ON p.id = languages_has_projects.projects_id LEFT JOIN languages AS l ON l.id = languages_has_projects.languages_id LEFT JOIN linkedinkeywords_has_projects ON p.id = linkedinkeywords_has_projects.projects_id LEFT JOIN linkedinkeywords AS lk ON lk.id = linkedinkeywords_has_projects.linkedinKeywords_id WHERE p.id = ? GROUP BY p.id"
  const projectId = req.params.id
  connection.query(sql, [projectId], (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting project')
    } else {
      res.status(200).json(result)
    }
  })
})

// rajouter service has projects
projectsRouter.get('/maxicard/:id', (req, res) => {
  let sql =
    "SELECT p.id, p.projectTitle, p.numProject, p.clientComment, p.totalPrice, p.itwStart, p.itwDeadline, p.quantityExpert, s.status, el.expertiseLevelName, cl.numClients, pt.projectTypeName,  group_concat(DISTINCT k.kindOfExpertName SEPARATOR ', ') AS kindOfExpert, group_concat(DISTINCT pr.practiceType SEPARATOR ', ') AS practice, group_concat(DISTINCT i.industryName SEPARATOR ', ') AS industry, group_concat(DISTINCT rc.companyName SEPARATOR ', ') AS recommend_company, group_concat(DISTINCT ec.companyName SEPARATOR ', ') AS exclude_company, group_concat(DISTINCT j.jobTitleName SEPARATOR ', ') AS jobTitle, group_concat(DISTINCT f.fonctionName SEPARATOR ', ') AS fonction, group_concat(DISTINCT g.geoExpertiseName SEPARATOR ', ') AS geoExpertise, group_concat(DISTINCT l.languagesName SEPARATOR ', ') AS languages, group_concat(DISTINCT lk.linkedinKey SEPARATOR ', ') AS linkedin, group_concat(DISTINCT se.serviceName SEPARATOR ', ') AS service FROM projects AS p LEFT JOIN status AS s ON s.id = p.status_id LEFT JOIN expertiselevel AS el ON el.id = p.expertiseLevel_id LEFT JOIN clients AS cl ON cl.id = p.client_id LEFT JOIN projecttype AS pt ON pt.id = p.projectType_id LEFT JOIN kindofexpert_has_projects ON p.id = kindofexpert_has_projects.projects_id LEFT JOIN kindofexpert AS k ON k.id = kindofexpert_has_projects.kindOfExpert_id LEFT JOIN projects_has_practice ON p.id = projects_has_practice.projects_id LEFT JOIN practice AS pr ON pr.id = projects_has_practice.practice_id LEFT JOIN projects_need_industry ON p.id = projects_need_industry.projects_id LEFT JOIN industry AS i ON i.id = projects_need_industry.industry_id LEFT JOIN projects_recommend_company ON p.id = projects_recommend_company.projects_id LEFT JOIN company AS rc ON rc.id = projects_recommend_company.company_id LEFT JOIN projects_exclude_company ON p.id = projects_exclude_company.projects_id LEFT JOIN company AS ec ON ec.id = projects_exclude_company.company_id LEFT JOIN projects_has_jobtitle ON p.id = projects_has_jobtitle.projects_id LEFT JOIN jobtitle AS j ON j.id = projects_has_jobtitle.jobTitle_id LEFT JOIN projects_need_fonction ON p.id = projects_need_fonction.projects_id LEFT JOIN fonction AS f ON f.id = projects_need_fonction.fonction_id LEFT JOIN projects_need_geoexpertise ON p.id = projects_need_geoexpertise.projects_id LEFT JOIN geoexpertise AS g ON g.id = projects_need_geoexpertise.geoExpertise_id LEFT JOIN languages_has_projects ON p.id = languages_has_projects.projects_id LEFT JOIN languages AS l ON l.id = languages_has_projects.languages_id LEFT JOIN linkedinkeywords_has_projects ON p.id = linkedinkeywords_has_projects.projects_id LEFT JOIN linkedinkeywords AS lk ON lk.id = linkedinkeywords_has_projects.linkedinKeywords_id LEFT JOIN service_has_projects ON p.id = service_has_projects.projects_id LEFT JOIN service AS se ON se.id = service_has_projects.service_id WHERE p.id = ? GROUP BY p.id"
  const projectId = req.params.id
  connection.query(sql, [projectId], (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting project')
    } else {
      res.status(200).json(result)
    }
  })
})

projectsRouter.get('/experts/:id', (req, res) => {
  let sql =
    "SELECT group_concat(DISTINCT ehp.experts_id SEPARATOR ', ') AS experts_id FROM experts_has_projects AS ehp WHERE ehp.projects_id = ? GROUP BY ehp.projects_id;"
  const projectId = req.params.id
  connection.query(sql, [projectId], (err, result) => {
    let answer = []
    if (result.length) {
      let sql2 =
        "SELECT e.id, e.numExpert, e.firstname, e.lastname,koe.kindOfExpertName, c.companyName, e.price, e.cost, jt.jobTitleName, e.keywords, ehp.answer, ehp.preferedItwDay, ehp.factuByExpert, group_concat(DISTINCT la.languagesName SEPARATOR ', ') AS languages, group_concat(DISTINCT company.companyName SEPARATOR ', ') AS pastCompanies FROM experts_has_projects AS ehp LEFT JOIN experts AS e ON ehp.experts_id = e.id LEFT JOIN kindofexpert AS koe ON e.kindOfExpert_id = koe.id LEFT JOIN expertiselevel AS el ON e.expertiseLevel_id = el.id LEFT JOIN company AS c ON e.company_id = c.id LEFT JOIN experts_has_languages AS ela ON ela.experts_id = e.id LEFT JOIN languages AS la ON ela.languages_id = la.id LEFT JOIN past_companies AS pc ON pc.experts_id = e.id LEFT JOIN company ON pc.pastCompany_id = company.id LEFT JOIN jobtitle AS jt ON e.jobtitle_id = jt.id LEFT JOIN experts_has_projects ON ehp.experts_id = e.id LEFT JOIN experts_has_industry AS ehi ON ehi.experts_id = e.id LEFT JOIN industry AS i ON ehi.industry_id = i.id LEFT JOIN projects ON ehp.projects_id = projects.id WHERE e.id = ? AND ehp.projects_id = ? GROUP BY e.id;"

      let resArray = []
      let results = result[0].experts_id.split(', ')

      for (let i = 0; i < results.length; i++) {
        resArray.push(results[i])
      }

      console.log(resArray)

      for (let i = 0; i < resArray.length; i++) {
        let datas = [resArray[i], projectId]

        console.log(datas)

        connection.query(sql2, datas, (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error requesting expert')
          } else {
            answer.push(result[0])
            console.log(answer)
            if (answer.length === results.length) {
              res.status(200).json(answer)
            }
          }
        })
      }
    } else {
      res.status(200).json(answer)
    }
  })
})

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

projectsRouter.get('/form/:id', (req, res) => {
  let id = req.params.id
  let sql =
    "SELECT p.id, p.projectTitle, p.numProject, p.clientComment, p.totalPrice, p.itwStart, p.itwDeadline, p.quantityExpert, s.status, el.expertiseLevelName, cl.numClients, pt.projectTypeName,  group_concat(DISTINCT k.kindOfExpertName SEPARATOR ', ') AS kindOfExpert, group_concat(DISTINCT pr.practiceType SEPARATOR ', ') AS practice, group_concat(DISTINCT i.industryName SEPARATOR ', ') AS industry, group_concat(DISTINCT rc.companyName SEPARATOR ', ') AS recommend_company, group_concat(DISTINCT ec.companyName SEPARATOR ', ') AS exclude_company, group_concat(DISTINCT j.jobTitleName SEPARATOR ', ') AS jobTitle, group_concat(DISTINCT f.fonctionName SEPARATOR ', ') AS fonction, group_concat(DISTINCT g.geoExpertiseName SEPARATOR ', ') AS geoExpertise, group_concat(DISTINCT l.languagesName SEPARATOR ', ') AS languages, group_concat(DISTINCT lk.linkedinKey SEPARATOR ', ') AS linkedin, group_concat(DISTINCT se.serviceName SEPARATOR ', ') AS service FROM projects AS p LEFT JOIN status AS s ON s.id = p.status_id LEFT JOIN expertiselevel AS el ON el.id = p.expertiseLevel_id LEFT JOIN clients AS cl ON cl.id = p.client_id LEFT JOIN projecttype AS pt ON pt.id = p.projectType_id LEFT JOIN kindofexpert_has_projects ON p.id = kindofexpert_has_projects.projects_id LEFT JOIN kindofexpert AS k ON k.id = kindofexpert_has_projects.kindOfExpert_id LEFT JOIN projects_has_practice ON p.id = projects_has_practice.projects_id LEFT JOIN practice AS pr ON pr.id = projects_has_practice.practice_id LEFT JOIN projects_need_industry ON p.id = projects_need_industry.projects_id LEFT JOIN industry AS i ON i.id = projects_need_industry.industry_id LEFT JOIN projects_recommend_company ON p.id = projects_recommend_company.projects_id LEFT JOIN company AS rc ON rc.id = projects_recommend_company.company_id LEFT JOIN projects_exclude_company ON p.id = projects_exclude_company.projects_id LEFT JOIN company AS ec ON ec.id = projects_exclude_company.company_id LEFT JOIN projects_has_jobtitle ON p.id = projects_has_jobtitle.projects_id LEFT JOIN jobtitle AS j ON j.id = projects_has_jobtitle.jobTitle_id LEFT JOIN projects_need_fonction ON p.id = projects_need_fonction.projects_id LEFT JOIN fonction AS f ON f.id = projects_need_fonction.fonction_id LEFT JOIN projects_need_geoexpertise ON p.id = projects_need_geoexpertise.projects_id LEFT JOIN geoexpertise AS g ON g.id = projects_need_geoexpertise.geoExpertise_id LEFT JOIN languages_has_projects ON p.id = languages_has_projects.projects_id LEFT JOIN languages AS l ON l.id = languages_has_projects.languages_id LEFT JOIN linkedinkeywords_has_projects ON p.id = linkedinkeywords_has_projects.projects_id LEFT JOIN linkedinkeywords AS lk ON lk.id = linkedinkeywords_has_projects.linkedinKeywords_id LEFT JOIN service_has_projects ON p.id = service_has_projects.projects_id LEFT JOIN service AS se ON se.id = service_has_projects.service_id WHERE p.numProject IN (SELECT p.numProject FROM projects as p) and p.id = ? GROUP BY p.numProject"
  connection.query(sql, id, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting GET projects')
    } else {
      // champs libres avec une seule donnée
      const id = result[0].id
      const itwStart = result[0].itwStart
      const itwDeadline = result[0].itwDeadline
      const projectTitle = result[0].projectTitle
      const quantity = result[0].quantityExpert
      const comment = result[0].clientComment
      const totalPrice = result[0].totalPrice
      const numProject = result[0].numProject

      // liste déroulante avec un choix possible
      const client = [
        {
          value: result[0].numClients,
          label: result[0].numClients
        }
      ]
      const projectType = [
        {
          value: result[0].projectTypeName,
          label: result[0].projectTypeName
        }
      ]
      const status = [
        {
          value: result[0].status,
          label: result[0].status
        }
      ]
      const expertiseLevel = [
        {
          value: result[0].expertiseLevelName,
          label: result[0].expertiseLevelName
        }
      ]

      // liste déroulante multichoix
      let ecie = []
      if (result[0].exclude_company) {
        const ecieArr = result[0].exclude_company.split(', ')
        for (let i = 0; i < ecieArr.length; i++) {
          ecie.push({ value: ecieArr[i], label: ecieArr[i] })
        }
      }

      let fonction = []
      if (result[0].fonction) {
        const fonctionArr = result[0].fonction.split(', ')
        for (let i = 0; i < fonctionArr.length; i++) {
          fonction.push({ value: fonctionArr[i], label: fonctionArr[i] })
        }
      }

      let geoExpertise = []
      if (result[0].geoExpertise) {
        const geoExpertiseArr = result[0].geoExpertise.split(', ')
        for (let i = 0; i < geoExpertiseArr.length; i++) {
          geoExpertise.push({
            value: geoExpertiseArr[i],
            label: geoExpertiseArr[i]
          })
        }
      }

      let industry = []
      if (result[0].industry) {
        const industryArr = result[0].industry.split(', ')
        for (let i = 0; i < industryArr.length; i++) {
          industry.push({
            value: industryArr[i],
            label: industryArr[i]
          })
        }
      }

      let jobTitle = []
      if (result[0].jobTitle) {
        const jobTitleArr = result[0].jobTitle.split(', ')
        for (let i = 0; i < jobTitleArr.length; i++) {
          jobTitle.push({
            value: jobTitleArr[i],
            label: jobTitleArr[i]
          })
        }
      }

      let kindOfExpert = []
      if (result[0].kindOfExpert) {
        const kindOfExpertArr = result[0].kindOfExpert.split(', ')
        for (let i = 0; i < kindOfExpertArr.length; i++) {
          kindOfExpert.push({
            value: kindOfExpertArr[i],
            label: kindOfExpertArr[i]
          })
        }
      }

      let languages = []
      if (result[0].languages) {
        const languagesArr = result[0].languages.split(', ')
        for (let i = 0; i < languagesArr.length; i++) {
          languages.push({
            value: languagesArr[i],
            label: languagesArr[i]
          })
        }
      }

      let linkedin = []
      if (result[0].linkedin) {
        const linkedinArr = result[0].linkedin.split(', ')
        for (let i = 0; i < linkedinArr.length; i++) {
          linkedin.push({
            value: linkedinArr[i],
            label: linkedinArr[i]
          })
        }
      }

      let practice = []
      if (result[0].practice) {
        const practiceArr = result[0].practice.split(', ')
        for (let i = 0; i < practiceArr.length; i++) {
          practice.push({
            value: practiceArr[i],
            label: practiceArr[i]
          })
        }
      }

      let rcie = []
      if (result[0].recommend_company) {
        const rcieArr = result[0].recommend_company.split(', ')
        for (let i = 0; i < rcieArr.length; i++) {
          rcie.push({ value: rcieArr[i], label: rcieArr[i] })
        }
      }

      let service = []
      if (result[0].service) {
        const serviceArr = result[0].service.split(', ')
        for (let i = 0; i < serviceArr.length; i++) {
          service.push({
            value: serviceArr[i],
            label: serviceArr[i]
          })
        }
      }

      const datas = {
        id: id,
        itwStart: itwStart,
        itwDeadline: itwDeadline,
        projectTitle: projectTitle,
        quantity: quantity,
        comment: comment,
        totalPrice: totalPrice,
        numProject: numProject,
        client: [...client], //un choix possible dans liste
        projectType: [...projectType],
        status: [...status],
        expertiseLevel: [...expertiseLevel],
        ecie: ecie,
        fonction: fonction,
        geoExpertise: geoExpertise,
        industry: industry,
        jobTitle: jobTitle,
        kindOfExpert: kindOfExpert,
        languages: languages,
        linkedin: linkedin,
        practice: practice,
        rcie: rcie,
        service: service
      }
      res.status(200).json(datas)
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
    client_id,
    projectType_id
  ]

  // insert datas in projects
  let sql =
    'INSERT INTO projects (itwStart, itwDeadline , projectTitle, quantityExpert, clientComment, totalPrice, numProject, status_id, expertiseLevel_id, client_id, projectType_id) VALUES (?,?,?,?,?,?,?,?,?,?,?);'

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
    'INSERT INTO projects_recommend_company (company_id, projects_id) VALUES ?;'
  let sql12 =
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
                                              let ecie = []
                                              for (
                                                let i = 0;
                                                i < exampleCompany_id.length;
                                                i++
                                              ) {
                                                ecie.push([
                                                  exampleCompany_id[i],
                                                  id
                                                ])
                                              }
                                              connection.query(
                                                sql11,
                                                [ecie],
                                                (err, result) => {
                                                  if (err) {
                                                    console.error(err)
                                                    res
                                                      .status(500)
                                                      .send(
                                                        'Error requesting POST11 projects'
                                                      )
                                                  } else {
                                                    let se = []
                                                    for (
                                                      let i = 0;
                                                      i < service_id.length;
                                                      i++
                                                    ) {
                                                      se.push([
                                                        service_id[i],
                                                        id
                                                      ])
                                                    }
                                                    connection.query(
                                                      sql12,
                                                      [se],
                                                      (err, result) => {
                                                        if (err) {
                                                          console.error(err)
                                                          res
                                                            .status(500)
                                                            .send(
                                                              'Error requesting POST12 projects'
                                                            )
                                                        } else {
                                                          res.status(200).json
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

projectsRouter.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const body = req.body
  const sqlData1 = {
    numProject: body.numProject,
    quantityExpert: body.quantityExpert,
    projectTitle: body.projectTitle,
    clientComment: body.clientComment,
    totalPrice: req.body.totalPrice,
    itwStart: body.itwStart,
    itwDeadline: body.itwDeadline,
    status_id: body.status_id,
    expertiseLevel_id: body.expertiseLevel_id,
    client_id: body.client_id
  }

  const sqlData2 = body.languages_id
  const sqlData3 = body.service_id
  const sqlData4 = body.kindOfExpert_id
  const sqlData5 = body.geoExpertise_id
  const sqlData6 = body.linkedinKeywords_id
  const sqlData7 = body.excludedCompany_id
  const sqlData8 = body.jobTitle_id
  const sqlData9 = body.practice_id
  const sqlData10 = body.projectType_id
  const sqlData11 = body.fonction_id
  const sqlData12 = body.industry_id
  const sqlData13 = body.exampleCompany_id

  let resultEnd = ''

  let sql1 = 'UPDATE projects SET '

  let sql2Del = 'DELETE FROM languages_has_projects WHERE projects_id = ?'
  let sql2Post =
    'INSERT INTO languages_has_projects (projects_id, languages_id) VALUES ?;'

  let sql3Del = 'DELETE FROM service_has_projects WHERE projects_id = ?'
  let sql3Post =
    'INSERT INTO service_has_projects (projects_id, service_id) VALUES ?;'

  let sql4Del = 'DELETE FROM kindOfExpert_has_projects WHERE projects_id = ?'
  let sql4Post =
    'INSERT INTO kindOfExpert_has_projects (projects_id, kindOfExpert_id) VALUES ?;'

  let sql5Del = 'DELETE FROM projects_need_geoexpertise WHERE projects_id = ?'
  let sql5Post =
    'INSERT INTO projects_need_geoexpertise (projects_id, geoExpertise_id) VALUES ?;'

  let sql6Del =
    'DELETE FROM linkedinkeywords_has_projects WHERE projects_id = ?'
  let sql6Post =
    'INSERT INTO linkedinkeywords_has_projects (projects_id, linkedinKeywords_id) VALUES ?;'

  let sql7Del = 'DELETE FROM projects_exclude_company WHERE projects_id = ?'
  let sql7Post =
    'INSERT INTO projects_exclude_company (projects_id, company_id) VALUES ?;'

  let sql8Del = 'DELETE FROM projects_has_jobtitle WHERE projects_id = ?'
  let sql8Post =
    'INSERT INTO projects_has_jobtitle (projects_id, jobTitle_id) VALUES ?;'

  let sql9Del = 'DELETE FROM projects_has_practice WHERE projects_id = ?'
  let sql9Post =
    'INSERT INTO projects_has_practice (projects_id, practice_id) VALUES ?;'

  let sql10Del = 'DELETE FROM projects_has_projecttype WHERE projects_id = ?'
  let sql10Post =
    'INSERT INTO projects_has_projecttype (projects_id, projectType_id) VALUES ?;'

  let sql11Del = 'DELETE FROM projects_need_fonction WHERE projects_id = ?'
  let sql11Post =
    'INSERT INTO projects_need_fonction (projects_id, fonction_id) VALUES ?;'

  let sql12Del = 'DELETE FROM projects_need_industry WHERE projects_id = ?'
  let sql12Post =
    'INSERT INTO projects_need_industry (projects_id, industry_id) VALUES ?;'

  let sql13Del = 'DELETE FROM projects_recommend_company WHERE projects_id = ?'
  let sql13Post =
    'INSERT INTO projects_recommend_company (projects_id, company_id) VALUES ?;'

  /***************** SQLDATA1 - datas ********************/
  const datas = Object.entries(sqlData1)
  let myArray = datas
    .filter(element => element[1] !== undefined)
    .filter(element => element[1] !== '')
    .filter(element => element[1].length !== 0)
    .filter(element => element[1].length !== null)

  let sql1Val = []

  myArray.map((array, i, arr) => {
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
        res.status(500).send('Error updating sql1 projects')
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
        res.status(500).send('Error updating DELETE2 projects')
      } else {
        let lan = []
        for (let i = 0; i < sqlData2.length; i++) {
          lan.push([id, sqlData2[i]])
        }
        connection.query(sql2Post, [lan], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST2 projects')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }

  /********************** SQLDATA3 - SERVICE ******************/
  if (sqlData3.length > 0) {
    connection.query(sql3Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE3 projects')
      } else {
        let se = []
        for (let i = 0; i < sqlData3.length; i++) {
          se.push([id, sqlData3[i]])
        }
        connection.query(sql3Post, [se], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST3 projects')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }

  /********************** SQLDATA4 - KIND OF EXPERT ******************/
  if (sqlData4.length > 0) {
    connection.query(sql4Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE4 projects')
      } else {
        let koe = []
        for (let i = 0; i < sqlData4.length; i++) {
          koe.push([id, sqlData4[i]])
        }
        connection.query(sql4Post, [koe], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST4 projects')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }

  /********************** SQLDATA5 - GEOEXPERTISE ******************/
  if (sqlData5.length > 0) {
    connection.query(sql5Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE5 projects')
      } else {
        let geo = []
        for (let i = 0; i < sqlData5.length; i++) {
          geo.push([id, sqlData5[i]])
        }
        connection.query(sql5Post, [geo], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST5 projects')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }

  /********************** SQLDATA6 - LINKEDIN KEYWORDS ******************/
  if (sqlData6.length > 0) {
    connection.query(sql6Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE6 projects')
      } else {
        let lin = []
        for (let i = 0; i < sqlData6.length; i++) {
          lin.push([id, sqlData6[i]])
        }
        connection.query(sql6Post, [lin], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST6 projects')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }

  /********************** SQLDATA7 - EXCLUDED COMPANY ******************/
  if (sqlData7.length > 0) {
    connection.query(sql7Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE7 projects')
      } else {
        let ecie = []
        for (let i = 0; i < sqlData7.length; i++) {
          ecie.push([id, sqlData7[i]])
        }
        connection.query(sql7Post, [ecie], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST7 projects')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }

  /********************** SQLDATA8 - JOB TITLE ******************/
  if (sqlData8.length > 0) {
    connection.query(sql8Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE8 projects')
      } else {
        let job = []
        for (let i = 0; i < sqlData8.length; i++) {
          job.push([id, sqlData8[i]])
        }
        connection.query(sql8Post, [job], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST8 projects')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }

  /********************** SQLDATA9 - PRACTICE ******************/
  if (sqlData9.length > 0) {
    connection.query(sql9Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE9 projects')
      } else {
        let pra = []
        for (let i = 0; i < sqlData9.length; i++) {
          pra.push([id, sqlData9[i]])
        }
        connection.query(sql9Post, [pra], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST9 projects')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }

  /********************** SQLDATA10 - PROJECT TYPE ******************/
  if (sqlData10.length > 0) {
    connection.query(sql10Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE10 projects')
      } else {
        let pt = []
        for (let i = 0; i < sqlData10.length; i++) {
          pt.push([id, sqlData10[i]])
        }
        connection.query(sql10Post, [pt], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST10 projects')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }

  /********************** SQLDATA11 - FONCTION ******************/
  if (sqlData11.length > 0) {
    connection.query(sql11Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE11 projects')
      } else {
        let fon = []
        for (let i = 0; i < sqlData11.length; i++) {
          fon.push([id, sqlData11[i]])
        }
        connection.query(sql11Post, [fon], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST11 projects')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }

  /********************** SQLDATA12 - INDUSTRY ******************/
  if (sqlData12.length > 0) {
    connection.query(sql12Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE12 projects')
      } else {
        let ind = []
        for (let i = 0; i < sqlData12.length; i++) {
          ind.push([id, sqlData12[i]])
        }
        connection.query(sql12Post, [ind], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST12 projects')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }

  /********************** SQLDATA13 - EXAMPLE COMPANY ******************/
  if (sqlData13.length > 0) {
    connection.query(sql13Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE13 projects')
      } else {
        let ecie = []
        for (let i = 0; i < sqlData13.length; i++) {
          ecie.push([id, sqlData13[i]])
        }
        connection.query(sql13Post, [ecie], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST13 projects')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }
  res.send(resultEnd)
})

projectsRouter.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const sql = 'DELETE FROM projects WHERE id = ?;'
  connection.query(sql, id, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error Delete projects')
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = projectsRouter
