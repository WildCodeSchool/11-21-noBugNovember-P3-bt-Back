const projexpertsRouter = require('express').Router()
const connection = require('../config/db.js')

projexpertsRouter.get('/:id', (req, res) => {
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

      for (let i = 0; i < resArray.length; i++) {
        let datas = [resArray[i], projectId]

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

projexpertsRouter.get('/form/:id', (req, res) => {
  let sql =
    "SELECT group_concat(DISTINCT ehp.experts_id SEPARATOR ', ') AS experts_id FROM experts_has_projects AS ehp WHERE ehp.projects_id = ? GROUP BY ehp.projects_id;"
  const projectId = req.params.id
  connection.query(sql, [projectId], (err, result) => {
    let array = []
    if (result.length) {
      let sql2 =
        'SELECT e.id, ehp.answer, ehp.preferedItwDay, ehp.factuByExpert, FROM experts_has_projects AS ehp LEFT JOIN experts AS e ON ehp.experts_id = e.id LEFT JOIN experts_has_projects ON ehp.experts_id = e.id WHERE e.id = ? AND ehp.projects_id = ? GROUP BY e.id;'

      let resArray = []
      let results = result[0].experts_id.split(', ')

      for (let i = 0; i < results.length; i++) {
        resArray.push(results[i])
      }

      for (let i = 0; i < resArray.length; i++) {
        let datas = [resArray[i], projectId]

        connection.query(sql2, datas, (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error requesting expert')
          } else {
            array.push(result[0])
            console.log(array)
            if (array.length === results.length) {
              const id = result[0].id
              const answer = result[0].answer
              const itwDay = result[0].preferedItwDay
              const factu = result[0].factuByExpert

              const res = {
                id: id,
                answer: answer,
                itwDay: itwDay,
                factu: factu
              }
              res.status(200).json(res)
            }
          }
        })
      }
    } else {
      res.status(200).json(answer)
    }
  })
})

projexpertsRouter.post('/', (req, res) => {
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

module.exports = projexpertsRouter
