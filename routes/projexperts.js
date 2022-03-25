const projexpertsRouter = require('express').Router()
const connection = require('../config/db.js')

projexpertsRouter.get('/:id', (req, res) => {
  let sql =
    "SELECT group_concat(DISTINCT ehp.experts_id SEPARATOR ', ') AS experts_id FROM experts_has_projects AS ehp WHERE ehp.projects_id = ? GROUP BY ehp.projects_id;"
  const expertId = req.params.id
  connection.query(sql, [expertId], (err, result) => {
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
        let datas = [resArray[i], expertId]

        connection.query(sql2, datas, (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).send('Error requesting expert')
          } else {
            answer.push(result[0])
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

projexpertsRouter.put('/form/:id', (req, res) => {
  const experts_id = parseInt(req.params.id)
  const projects_id = parseInt(req.body.projects_id)
  let sql =
    'SELECT ehp.experts_id, ehp.answer, ehp.preferedItwDay, ehp.factuByExpert FROM experts_has_projects AS ehp WHERE ehp.experts_id = ? AND ehp.projects_id = ? GROUP BY ehp.experts_id;'
  connection.query(sql, [experts_id, projects_id], (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting expert')
    } else {
      const id = result[0].id
      const itwDay = result[0].preferedItwDay
      const factu = result[0].factuByExpert
      let answer = undefined
      if (result[0].answer) {
        if (result[0].answer === 1) {
          answer = { id: 1, value: 'Yes', label: 'Yes' }
        } else {
          answer = { id: 2, value: 'No', label: 'No' }
        }
      }
      answer = result[0].answer

      const datas = {
        id: id,
        answer: answer,
        itwDay: itwDay,
        factu: factu
      }
      res.status(200).json(datas)
    }
  })
})

projexpertsRouter.put('/:id', async (req, res) => {
  const experts_id = parseInt(req.params.id)
  const body = req.body
  const projects_id = parseInt(body.idProject)
  const sqlData = {
    answer: body.answer,
    factuByExpert: body.factu,
    preferedItwDay: body.itwDay
  }

  let sql = 'UPDATE experts_has_projects SET '

  const datas = Object.entries(sqlData)
  let myArray = datas
    .filter(element => element[1] !== undefined)
    .filter(element => element[1] !== '')
    .filter(element => element[1].length !== 0)
    .filter(element => element[1].length !== null)

  let sqlVal = []

  myArray.map((array, i, arr) => {
    if (i < arr.length - 1) {
      sql += `${array[0]} = ?, `
      sqlVal.push(array[1])
    } else {
      sql += `${array[0]} = ? `
      sqlVal.push(array[1])
    }
  })

  sql += 'WHERE experts_id = ? AND projects_id = ?;'
  sqlVal.push(experts_id, projects_id)

  if (myArray.length > 0) {
    connection.query(sql, sqlVal, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating sql projexperts')
      } else {
        res.send(result)
      }
    })
  }
})

projexpertsRouter.put('/delete/:id', (req, res) => {
  const experts_id = parseInt(req.params.id)
  const projects_id = parseInt(req.body.projects_id)
  const sql =
    'DELETE FROM experts_has_projects WHERE experts_id = ? AND projects_id = ?;'
  connection.query(sql, [experts_id, projects_id], (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error Delete projexpert')
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = projexpertsRouter
