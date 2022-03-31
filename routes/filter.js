const filterRouter = require('express').Router()
const connection = require('../config/db.js')

filterRouter.get('/', (req, res) => {
  // return console.log(req.query)
  const {
    kindofexpert,
    practice,
    industry,
    jobtitle,
    geo,
    lang,
    yoe,
    cie,
    pastcie,
    feedback,
    key,
    price
  } = req.query
  const sqlValues = []

  let filter = ''

  if (kindofexpert) {
    let inconnue = []
    const tab = kindofexpert.split(',')
    tab.map(el => {
      sqlValues.push(parseInt(el))
      inconnue.push('?')
    })

    if (inconnue.length > 1) {
      inconnue = inconnue.join(',')
    }
    // console.log("result", inconnue)
    filter += `AND e.kindOfExpert_id IN (${inconnue})`
  }

  if (price) {
    let inconnue = []
    const tab = price.split(',')
    tab.map(el => {
      sqlValues.push(parseInt(el))
      inconnue.push('?')
    })
    // if (inconnue.length > 1) {
    //   inconnue = inconnue.join(',')
    // }
    console.log('price :', price)
    if (price == 1) {
      filter += 'AND price < 250 '
    } else if (price == 2) {
      filter += 'AND price BETWEEN 250 AND 500 '
    } else if (price == 3) {
      filter += 'AND price > 500 '
    }
  }

  if (practice) {
    let inconnue = []
    const tab = practice.split(',')
    tab.map(el => {
      sqlValues.push(parseInt(el))
      inconnue.push('?')
    })
    if (inconnue.length > 1) {
      inconnue = inconnue.join(',')
    }
    filter += `AND e.practice_id IN (${inconnue})`
  }

  if (industry) {
    let inconnue = []
    const tab = industry.split(',')
    tab.map(el => {
      sqlValues.push(parseInt(el))
      inconnue.push('?')
    })
    if (inconnue.length > 1) {
      inconnue = inconnue.join(',')
    }
    filter += `AND ehi.industry_id IN (${inconnue})`
  }

  if (jobtitle) {
    let inconnue = []
    const tab = jobtitle.split(',')
    tab.map(el => {
      sqlValues.push(parseInt(el))
      inconnue.push('?')
    })
    if (inconnue.length > 1) {
      inconnue = inconnue.join(',')
    }
    filter += `AND e.jobtitle_id  IN (${inconnue})`
  }

  if (geo) {
    let inconnue = []
    const tab = geo.split(',')
    tab.map(el => {
      sqlValues.push(parseInt(el))
      inconnue.push('?')
    })
    if (inconnue.length > 1) {
      inconnue = inconnue.join(',')
    }
    filter += `AND ege.geoExpertise_id IN (${inconnue})`
  }

  if (lang) {
    let inconnue = []
    const tab = lang.split(',')
    tab.map(el => {
      sqlValues.push(parseInt(el))
      inconnue.push('?')
    })

    if (inconnue.length > 1) {
      inconnue = inconnue.join(',')
    }
    filter += `AND ela.languages_id IN (${inconnue})`
  }

  if (yoe) {
    let inconnue = []
    const tab = yoe.split(',')
    tab.map(el => {
      sqlValues.push(parseInt(el))
      inconnue.push('?')
    })

    if (inconnue.length > 1) {
      inconnue = inconnue.join(',')
    }
    filter += `AND e.expertiseLevel_id IN (${inconnue})`
  }

  if (cie) {
    // let inconnue = []
    // const tab = cie.split(',')
    // tab.map(el => {
    //     sqlValues.push(parseInt(el))
    //     inconnue.push('?')
    // })

    // if (inconnue.length>1){
    //     inconnue = inconnue.join(',')
    // }
    filter += 'AND c.companyName LIKE ?'
    sqlValues.push(`%${cie}%`)
  }

  if (pastcie) {
    filter += 'AND company.companyName LIKE ?'
    sqlValues.push(`%${pastcie}%`)
  }

  if (feedback) {
    filter += 'AND e.feedbackExpert LIKE ?'
    sqlValues.push(`%${feedback}%`)
  }

  if (key) {
    filter += 'AND e.keywords LIKE ?'
    sqlValues.push(`%${key}%`)
  }

  let sql = `SELECT e.id, e.numExpert, e.firstname, e.lastname, e.phone, e.email, e.linkedinProfile, koe.kindOfExpertName, p.practiceType, el.expertiseLevelName, c.companyName, e.price, e.cost, e.keywords, jt.jobTitleName, e.feedbackExpert, group_concat(DISTINCT ehp.projects_id SEPARATOR ', ') AS projects_id, group_concat(DISTINCT projects.projectTitle SEPARATOR ', ') AS projectTitle, group_concat(DISTINCT projects.numProject SEPARATOR ', ') AS numProject, (SELECT ehp.preferedItwDay WHERE projects.status_id != 3) AS itwday, group_concat(DISTINCT la.languagesName SEPARATOR ', ') AS languages, group_concat(DISTINCT company.companyName SEPARATOR ', ') AS pastCompanies, group_concat(DISTINCT  ct.contactTypeName SEPARATOR ', ') AS  contact, group_concat(DISTINCT  ge.geoExpertiseName SEPARATOR ', ') AS  geoExpertiseName, group_concat(DISTINCT  hcp.hcpTypeName SEPARATOR ', ') AS  hcpTypeName, group_concat(DISTINCT  i.industryName SEPARATOR ', ') AS  industry, group_concat(DISTINCT  fct.fonctionName SEPARATOR ', ') AS  fonction, group_concat(DISTINCT  spc.specialtyName SEPARATOR ', ') AS  specialty, group_concat(DISTINCT sct.sectorName SEPARATOR ', ') AS  sectorName FROM experts AS e LEFT JOIN experts_has_contacttype AS ect ON ect.experts_id = e.id LEFT JOIN contactType AS ct ON ect.contacttype_id = ct.id LEFT JOIN kindofexpert AS koe ON e.kindOfExpert_id = koe.id LEFT JOIN practice AS p ON e.practice_id = p.id LEFT JOIN expertiselevel AS el ON e.expertiseLevel_id = el.id LEFT JOIN company AS c ON e.company_id = c.id LEFT JOIN experts_has_geoexpertise AS ege ON ege.experts_id = e.id LEFT JOIN geoexpertise AS ge ON ege.geoExpertise_id = ge.id LEFT JOIN experts_has_languages AS ela ON ela.experts_id = e.id LEFT JOIN languages AS la ON ela.languages_id = la.id LEFT JOIN past_companies AS pc ON pc.experts_id = e.id LEFT JOIN experts_has_fonction AS ehf ON ehf.experts_id = e.id LEFT JOIN fonction AS fct ON ehf.fonction_id = fct.id LEFT JOIN company ON pc.pastCompany_id = company.id LEFT JOIN jobtitle AS jt ON e.jobtitle_id = jt.id LEFT JOIN experts_has_projects AS ehp ON ehp.experts_id = e.id LEFT JOIN experts_has_sector AS ehsct ON ehsct.experts_id = e.id LEFT JOIN sector AS sct ON sct.id = ehsct.sector_id LEFT JOIN experts_has_specialty AS espc ON espc.experts_id = e.id LEFT JOIN specialty AS spc ON spc.id = espc.specialty_id LEFT JOIN experts_has_hcptype AS ehcp ON ehcp.experts_id = e.id LEFT JOIN hcptype AS hcp ON hcp.id = ehcp.hcpType_id LEFT JOIN experts_has_industry AS ehi ON ehi.experts_id = e.id LEFT JOIN industry AS i ON ehi.industry_id = i.id LEFT JOIN projects ON ehp.projects_id = projects.id WHERE e.numExpert IN (SELECT e.numExpert FROM experts AS e) ${filter} GROUP BY e.numExpert`
  console.log(sql)
  connection.query(sql, sqlValues, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error requesting projects')
    } else {
      //   console.log(result)
      res.status(200).json(result)
    }
  })
})

module.exports = filterRouter
