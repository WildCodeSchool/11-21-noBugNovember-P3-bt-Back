const projectsRouter = require('express').Router()
const connection = require('../config/db.js')

projectsRouter.get('/', (req, res) => {
  let sql =
    'SELECT p.projectTitle, p.numProject, p.clientComment, p.totalPrice, p.itwStart, p.itwDeadline, p.quantityExpert, s.status, el.expertiseLevelName, group_concat(DISTINCT pt.projectTypeName) AS projectType,  group_concat(DISTINCT k.kindOfExpertName) AS kindOfExpert, group_concat(DISTINCT pr.practiceType) AS practice, group_concat(DISTINCT i.industryName) AS industry, group_concat(DISTINCT rc.companyName) AS recommend_company, group_concat(DISTINCT ec.companyName) AS exclude_company, group_concat(DISTINCT j.jobTitleName) AS jobTitle, group_concat(DISTINCT f.fonctionName) AS fonction, group_concat(DISTINCT g.geoExpertiseName) AS geoExpertise, group_concat(DISTINCT l.languagesName) AS languages, group_concat(DISTINCT lk.linkedinKey) AS linkedin FROM projects AS p INNER JOIN status AS s ON s.id=p.status_id INNER JOIN expertiselevel AS el ON el.id = p.expertiseLevel_id INNER JOIN projects_has_projecttype ON p.id = projects_has_projecttype.projects_id INNER JOIN projecttype AS pt ON pt.id = projects_has_projecttype.projectType_id INNER JOIN kindofexpert_has_projects ON p.id = kindofexpert_has_projects.projects_id INNER JOIN kindofexpert AS k ON k.id = kindofexpert_has_projects.kindOfExpert_id INNER JOIN projects_has_practice ON p.id = projects_has_practice.projects_id INNER JOIN practice AS pr ON pr.id = projects_has_practice.practice_id INNER JOIN projects_need_industry ON p.id = projects_need_industry.projects_id INNER JOIN industry AS i ON i.id = projects_need_industry.industry_id LEFT JOIN projects_recommend_company ON p.id = projects_recommend_company.projects_id LEFT JOIN company AS rc ON rc.id = projects_recommend_company.company_id LEFT JOIN projects_exclude_company ON p.id = projects_exclude_company.projects_id LEFT JOIN company AS ec ON ec.id = projects_exclude_company.company_id INNER JOIN projects_has_jobtitle ON p.id = projects_has_jobtitle.projects_id INNER JOIN jobtitle AS j ON j.id = projects_has_jobtitle.jobTitle_id INNER JOIN projects_need_fonction ON p.id = projects_need_fonction.projects_id INNER JOIN fonction AS f ON f.id = projects_need_fonction.fonction_id INNER JOIN projects_need_geoexpertise ON p.id = projects_need_geoexpertise.projects_id INNER JOIN geoexpertise AS g ON g.id = projects_need_geoexpertise.geoExpertise_id INNER JOIN languages_has_projects ON p.id = languages_has_projects.projects_id INNER JOIN languages AS l ON l.id = languages_has_projects.languages_id INNER JOIN linkedinkeywords_has_projects ON p.id = linkedinkeywords_has_projects.projects_id INNER JOIN linkedinkeywords AS lk ON lk.id = linkedinkeywords_has_projects.linkedinKeywords_id GROUP BY p.projectTitle'
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting projects')
    } else {
      res.status(200).json(result)
    }
  })
})

projectsRouter.post("/add", (req, res) => {
  const sql = "INSERT INTO"
  // const value = [req.body. ---mes valeurs ---];

  connection.query(sql, value, (err, result) => {
if (err) {
        console.error(err)
        res.status(500).send('Error saving the project')
      } else {
        const id = result.insertId
        // const createdProject = { ---mes valeurs --- }
        res.status(201).json(createdProject)
      }
    }
  )
})

projectsRouter.put('/edit', (req, res) => {
    const sql = "UPDATE"
  // const value = [req.body. ---mes valeurs ---];
  const userPropsToUpdate = req.body
  connection.query(
    sql, value,
    (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating a project')
      }  else {
        const id = result.insertId
        // const updatedProject = { ---mes valeurs --- }
        res.status(204).json(updatedProject)
      }
    }
  )
})

projectsRouter.delete('/del/:id', (req, res) => {
  const sql = "DELETE FROM"
  const userId = req.params.id
  connection.query(
    sql, value,
    (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error deleting a project')
      } else {
        res.sendStatus(204)
      }
    }
  )
})

module.exports = projectsRouter
