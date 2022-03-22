const expertsRouter = require('express').Router()
const { send } = require('express/lib/response')
const connection = require('../config/db.js')

expertsRouter.get('/', (req, res) => {
  let sql =
    "SELECT e.id, e.numExpert, e.firstname, e.lastname, e.phone, e.email, e.linkedinProfile, koe.kindOfExpertName, p.practiceType, el.expertiseLevelName, c.companyName, e.price, e.cost, e.keywords, jt.jobTitleName, e.feedbackExpert, group_concat(DISTINCT ehp.projects_id SEPARATOR ', ') AS projects_id, group_concat(DISTINCT projects.projectTitle SEPARATOR ', ') AS projectTitle, group_concat(DISTINCT projects.numProject SEPARATOR ', ') AS numProject, (SELECT ehp.preferedItwDay WHERE projects.status_id != 3) AS itwday, group_concat(DISTINCT la.languagesName SEPARATOR ', ') AS languages, group_concat(DISTINCT company.companyName SEPARATOR ', ') AS pastCompanies, group_concat(DISTINCT  ct.contactTypeName SEPARATOR ', ') AS  contact, group_concat(DISTINCT  ge.geoExpertiseName SEPARATOR ', ') AS  geoExpertiseName, group_concat(DISTINCT  i.industryName SEPARATOR ', ') AS  industry FROM experts AS e LEFT JOIN experts_has_contacttype AS ect ON ect.experts_id = e.id LEFT JOIN contactType AS ct ON ect.contacttype_id = ct.id LEFT JOIN kindofexpert AS koe ON e.kindOfExpert_id = koe.id LEFT JOIN practice AS p ON e.practice_id = p.id LEFT JOIN expertiselevel AS el ON e.expertiseLevel_id = el.id LEFT JOIN company AS c ON e.company_id = c.id LEFT JOIN experts_has_geoexpertise AS ege ON ege.experts_id = e.id LEFT JOIN geoexpertise AS ge ON ege.geoExpertise_id = ge.id LEFT JOIN experts_has_languages AS ela ON ela.experts_id = e.id LEFT JOIN languages AS la ON ela.languages_id = la.id LEFT JOIN past_companies AS pc ON pc.experts_id = e.id LEFT JOIN company ON pc.pastCompany_id = company.id LEFT JOIN jobtitle AS jt ON e.jobtitle_id = jt.id LEFT JOIN experts_has_projects AS ehp ON ehp.experts_id = e.id LEFT JOIN experts_has_industry AS ehi ON ehi.experts_id = e.id LEFT JOIN industry AS i ON ehi.industry_id = i.id LEFT JOIN projects ON ehp.projects_id = projects.id WHERE e.numExpert IN (SELECT e.numExpert FROM experts AS e) GROUP BY e.numExpert"
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting GET experts')
    } else {
      res.status(200).json(result)
    }
  })
})

expertsRouter.get('/maxicard/:id', (req, res) => {
  let sql =
    "SELECT e.id, e.numExpert, e.firstname, e.lastname, e.phone, e.email, e.linkedinProfile, koe.kindOfExpertName, p.practiceType, el.expertiseLevelName, c.companyName, e.price, e.cost, e.keywords, jt.jobTitleName, e.feedbackExpert, group_concat(DISTINCT ehp.projects_id SEPARATOR ', ') AS projects_id, group_concat(DISTINCT projects.projectTitle SEPARATOR ', ') AS projectTitle, group_concat(DISTINCT projects.numProject SEPARATOR ', ') AS numProject, (SELECT ehp.preferedItwDay WHERE projects.status_id != 3) AS itwday, group_concat(DISTINCT la.languagesName SEPARATOR ', ') AS languages, group_concat(DISTINCT company.companyName SEPARATOR ', ') AS pastCompanies, group_concat(DISTINCT  ct.contactTypeName SEPARATOR ', ') AS  contact, group_concat(DISTINCT  ge.geoExpertiseName SEPARATOR ', ') AS  geoExpertiseName, group_concat(DISTINCT  i.industryName SEPARATOR ', ') AS  industry FROM experts AS e LEFT JOIN experts_has_contacttype AS ect ON ect.experts_id = e.id LEFT JOIN contactType AS ct ON ect.contacttype_id = ct.id LEFT JOIN kindofexpert AS koe ON e.kindOfExpert_id = koe.id LEFT JOIN practice AS p ON e.practice_id = p.id LEFT JOIN expertiselevel AS el ON e.expertiseLevel_id = el.id LEFT JOIN company AS c ON e.company_id = c.id LEFT JOIN experts_has_geoexpertise AS ege ON ege.experts_id = e.id LEFT JOIN geoexpertise AS ge ON ege.geoExpertise_id = ge.id LEFT JOIN experts_has_languages AS ela ON ela.experts_id = e.id LEFT JOIN languages AS la ON ela.languages_id = la.id LEFT JOIN past_companies AS pc ON pc.experts_id = e.id LEFT JOIN company ON pc.pastCompany_id = company.id LEFT JOIN jobtitle AS jt ON e.jobtitle_id = jt.id LEFT JOIN experts_has_projects AS ehp ON ehp.experts_id = e.id LEFT JOIN experts_has_industry AS ehi ON ehi.experts_id = e.id LEFT JOIN industry AS i ON ehi.industry_id = i.id LEFT JOIN projects ON ehp.projects_id = projects.id WHERE e.id = ? GROUP BY e.numExpert"
  const expertId = req.params.id
  connection.query(sql, [expertId], (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting GET experts')
    } else {
      res.status(200).json(result)
    }
  })
})

expertsRouter.get('/form', (req, res) => {
  let sqllan = 'SELECT id,languagesName FROM languages;'
  let sqlgeo = 'SELECT id, geoExpertiseName FROM geoexpertise;'
  let sqlkoe = 'SELECT id, kindOfExpertName FROM kindofexpert; '
  let sqlel = 'SELECT id, expertiseLevelName FROM expertiselevel;'
  let sqlpr = 'SELECT id, practiceType FROM practice;'
  let sqljob = 'SELECT id, jobTitleName FROM jobtitle;'
  let sqlcie = 'SELECT id, companyName FROM company;'
  let sqlctc = 'SELECT id, contactTypeName FROM contacttype;'
  let sqlpjt = 'SELECT id, projectTitle FROM projects; '
  let sqlindu = 'SELECT id, industryName FROM industry; '
  let languages = []
  let geoExpertise = []
  let kindOfExpert = []
  let expertiseLevel = []
  let practice = []
  let jobTitle = []
  let companies = []
  let contactType = []
  let projects = []
  let industry = []

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
                                        connection.query(
                                          sqlindu,
                                          (errindu, resultindu) => {
                                            if (errindu) {
                                              console.error(errindu)
                                            } else {
                                              resultindu.forEach(indu =>
                                                industry.push({
                                                  id: indu.id,
                                                  value: indu.industryName,
                                                  label: indu.industryName
                                                })
                                              )
                                              const options = {
                                                languages: [...languages],
                                                geoExpertise: [...geoExpertise],
                                                kindOfExpert: [...kindOfExpert],
                                                expertiseLevel: [
                                                  ...expertiseLevel
                                                ],
                                                practice: [...practice],
                                                jobTitle: [...jobTitle],
                                                companies: [...companies],
                                                contactType: [...contactType],
                                                projects: [...projects],
                                                industry: [...industry]
                                              }
                                              res.status(200).json(options)
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

expertsRouter.get('/form/:id', (req, res) => {
  let id = req.params.id
  let sql =
    "SELECT e.id, e.numExpert, e.firstname, e.lastname, e.phone, e.email, e.linkedinProfile, koe.kindOfExpertName, p.practiceType, el.expertiseLevelName, c.companyName,  e.price, e.cost, e.keywords, jt.jobTitleName, e.feedbackExpert, (SELECT ehp.answer WHERE projects.status_id != 3) AS answer, (SELECT projects.projectTitle WHERE projects.status_id != 3) AS project, (SELECT ehp.preferedItwDay WHERE projects.status_id != 3) AS itwday, group_concat(DISTINCT la.languagesName SEPARATOR ', ') AS languages, group_concat(DISTINCT company.companyName SEPARATOR ', ') AS pastCompanies, group_concat(DISTINCT  ct.contactTypeName SEPARATOR ', ') AS  contact, group_concat(DISTINCT  ge.geoExpertiseName SEPARATOR ', ') AS  geoExpertiseName FROM experts AS e LEFT JOIN experts_has_contacttype AS ect ON ect.experts_id = e.id LEFT JOIN contactType AS ct ON ect.contacttype_id = ct.id LEFT JOIN kindofexpert AS koe ON e.kindOfExpert_id = koe.id LEFT JOIN practice AS p ON e.practice_id = p.id LEFT JOIN expertiselevel AS el ON e.expertiseLevel_id = el.id LEFT JOIN company AS c ON e.company_id = c.id LEFT JOIN experts_has_geoexpertise AS ege ON ege.experts_id = e.id LEFT JOIN geoexpertise AS ge ON ege.geoExpertise_id = ge.id LEFT JOIN experts_has_languages AS ela ON ela.experts_id = e.id LEFT JOIN languages AS la ON ela.languages_id = la.id LEFT JOIN past_companies AS pc ON pc.experts_id = e.id LEFT JOIN company ON pc.pastCompany_id = company.id LEFT JOIN jobtitle AS jt ON e.jobtitle_id = jt.id LEFT JOIN experts_has_projects AS ehp ON ehp.experts_id = e.id LEFT JOIN projects ON ehp.projects_id = projects.id WHERE e.numExpert IN (SELECT e.numExpert FROM experts AS e) AND e.id = ? GROUP BY e.numExpert "
  connection.query(sql, id, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting GET experts')
    } else {
      // champs libres avec une seule donnée
      const id = result[0].id
      const numExpert = result[0].numExpert
      const firstname = result[0].firstname
      const lastname = result[0].lastname
      const phone = result[0].phone
      const email = result[0].email
      const linkedinProfile = result[0].linkedinProfile

      // liste déroulante avec un choix possible
      const kindOfExpertName = [
        { value: result[0].kindOfExpertName, label: result[0].kindOfExpertName }
      ]

      // liste déroulante multichoix
      let contact = []
      if (result[0].contact) {
        const contactArr = result[0].contact.split(', ')
        for (let i = 0; i < contactArr.length; i++) {
          contact.push({ value: contactArr[i], label: contactArr[i] })
        }
      }
      let projects = []
      if (result[0].project) {
        const pjtArr = result[0].project.split(', ')
        for (let i = 0; i < pjtArr.length; i++) {
          projects.push({ value: pjtArr[i], label: pjtArr[i] })
        }
      }
      const practiceType = [
        { value: result[0].practiceType, label: result[0].practiceType }
      ]
      let geoExpertiseName = []
      if (result[0].geoExpertiseName) {
        const geoExpertiseNameArr = result[0].geoExpertiseName.split(', ')
        for (let i = 0; i < geoExpertiseNameArr.length; i++) {
          geoExpertiseName.push({
            value: geoExpertiseNameArr[i],
            label: geoExpertiseNameArr[i]
          })
        }
      }
      const company = [
        { value: result[0].companyName, label: result[0].companyName }
      ]
      let pastCompanies = []
      if (result[0].pastCompanies) {
        const pcieArr = result[0].pastCompanies.split(', ')
        for (let i = 0; i < pcieArr.length; i++) {
          pastCompanies.push({ value: pcieArr[i], label: pcieArr[i] })
        }
      }
      const price = result[0].price
      const cost = result[0].cost
      const feedbackExpert = result[0].feedbackExpert
      const expertiseLevelName = [
        {
          value: result[0].expertiseLevelName,
          label: result[0].expertiseLevelName
        }
      ]
      let languages = []
      if (result[0].languages) {
        const languagesArr = result[0].languages.split(', ')
        for (let i = 0; i < languagesArr.length; i++) {
          languages.push({ value: languagesArr[i], label: languagesArr[i] })
        }
      }
      let jobTitleName = []
      if (result[0].jobTitleName) {
        const jobTitleNameArr = result[0].jobTitleName.split(', ')
        for (let i = 0; i < jobTitleNameArr.length; i++) {
          jobTitleName.push({
            value: jobTitleNameArr[i],
            label: jobTitleNameArr[i]
          })
        }
      }
      const keywords = result[0].keywords

      const datas = {
        id: id,
        numExpert: numExpert,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        linkedinProfile: linkedinProfile,
        kindOfExpert: [...kindOfExpertName], //un choix possible dans liste
        practice: [...practiceType],
        company: [...company],
        price: price,
        cost: cost,
        feedbackExpert: feedbackExpert,
        expertiseLevel: [...expertiseLevelName],
        languages: languages,
        pastCompanies: pastCompanies,
        jobTitleName: jobTitleName,
        geoExpertiseName: geoExpertiseName,
        projects: projects,
        contact: contact,
        keywords: keywords
      }
      res.status(200).json(datas)
    }
  })
})

expertsRouter.post('/test', (req, res) => {
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
    projects_id,
    industry_id
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
    jobtitle_id,
    industry_id
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
  let sql7 =
    'INSERT INTO experts_has_industry (experts_id, industry_id) VALUES ?;'
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
                          let indu = []
                          for (let i = 0; i < industry_id.length; i++) {
                            indu.push([id, industry_id[i]])
                          }
                          connection.query(sql7, [indu], (err, result) => {
                            if (err) {
                              console.error(err)
                              res
                                .status(500)
                                .send('Error requesting POST7 experts')
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
    }
  })
})

expertsRouter.post('/project', (req, res) => {
  const { expert_id, project_id } = req.body

  let datas = [expert_id, project_id]

  let sql =
    'INSERT INTO experts_has_projects (experts_id, projects_id) VALUES (?, ?)'

  connection.query(sql, datas, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting POST expert has project')
    } else {
      res.status(200).json(result)
    }
  })
})

expertsRouter.put('/form/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const body = req.body
  const sqlData1 = {
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    phone: body.phone,
    company_id: req.body.company_id,
    linkedinProfile: body.linkedinProfile,
    price: body.price,
    numExpert: body.numExpert,
    kindOfExpert_id: body.kindOfExpert_id,
    practice_id: body.practice_id,
    expertiseLevel_id: body.expertiseLevel_id,
    feedbackExpert: body.feedbackExpert,
    cost: body.cost,
    keywords: body.keywords,
    jobtitle_id: body.jobtitle_id
  }

  const sqlData2 = body.languages_id
  const sqlData3 = body.pastCompany_id
  const sqlData4 = body.contactType_id
  const sqlData5 = body.geoExpertise_id
  const sqlData6 = body.projects_id

  let resultEnd = ''

  let sql1 = 'UPDATE experts SET '
  let sql2Del = 'DELETE FROM experts_has_languages WHERE experts_id = ?'
  let sql2Post =
    'INSERT INTO experts_has_languages (experts_id, languages_id) VALUES ?;'
  let sql3Del = 'DELETE FROM past_companies WHERE experts_id = ?'
  let sql3Post =
    'INSERT INTO past_companies (experts_id, pastCompany_id) VALUES ?;'
  let sql4Del = 'DELETE FROM experts_has_contacttype WHERE experts_id = ?'
  let sql4Post =
    'INSERT INTO experts_has_contacttype (experts_id, contactType_id) VALUES ?;'
  let sql5Del = 'DELETE FROM experts_has_geoexpertise WHERE experts_id = ?'
  let sql5Post =
    'INSERT INTO experts_has_geoexpertise (experts_id, geoExpertise_id) VALUES ?;'
  let sql6Del = 'DELETE FROM experts_has_projects WHERE experts_id = ?'
  let sql6Post =
    'INSERT INTO experts_has_projects (experts_id, projects_id) VALUES ?;'

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

  /********************** SQLDATA3 - PAST COMPANIES ******************/
  if (sqlData3.length > 0) {
    connection.query(sql3Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE3 experts')
      } else {
        let pcie = []
        for (let i = 0; i < sqlData3.length; i++) {
          pcie.push([id, sqlData3[i]])
        }
        connection.query(sql3Post, [pcie], (err, result) => {
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

  /********************** SQLDATA4 - CONTACT TYPE ******************/
  if (sqlData4.length > 0) {
    connection.query(sql4Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE4 experts')
      } else {
        let ctc = []
        for (let i = 0; i < sqlData4.length; i++) {
          ctc.push([id, sqlData4[i]])
        }
        connection.query(sql4Post, [ctc], (err, result) => {
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

  /********************** SQLDATA5 - GEOEXPERTISE ******************/
  if (sqlData5.length > 0) {
    connection.query(sql5Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE5 experts')
      } else {
        let geo = []
        for (let i = 0; i < sqlData5.length; i++) {
          geo.push([id, sqlData5[i]])
        }
        connection.query(sql5Post, [geo], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST5 experts')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }

  /********************** SQLDATA6 - PROJECTS ******************/
  if (sqlData6.length > 0) {
    connection.query(sql6Del, id, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating DELETE6 experts')
      } else {
        let pjt = []
        for (let i = 0; i < sqlData6.length; i++) {
          pjt.push([id, sqlData6[i]])
        }
        connection.query(sql6Post, [pjt], (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error updating POST6 experts')
          } else {
            resultEnd = result
          }
        })
      }
    })
  }
  res.send(resultEnd)
})

expertsRouter.delete('/form/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const sql = 'DELETE FROM experts WHERE id = ?;'
  connection.query(sql, id, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error Delete experts')
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = expertsRouter
