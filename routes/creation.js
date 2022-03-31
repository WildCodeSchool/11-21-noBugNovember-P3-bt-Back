require('dotenv').config()
const creaRouter = require('express').Router()
const connection = require('../config/db.js')

creaRouter.get('/', (req, res) => {
  const sql = 'SELECT * FROM admin'
  mysql.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database')
    } else {
      res.status(200).json(result)
    }
  })
})

creaRouter.get('/:id', (req, res) => {
  const id = req.params.id
  console.log('----- id -----', id)
  const sql = `SELECT * FROM admin WHERE id = ?, ?, ?`
  mysql.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database')
    } else {
      res.status(200).json(result)
    }
  })
})

creaRouter.post('/', (req, res) => {
  const { email, password, forgetPassword } = req.body

  let datas = [email, password, forgetPassword]

  let sql =
    'INSERT INTO admin ( email, password, forgetPassword ) VALUES (?, ?, ?)'
  let sql2 = 'SELECT * FROM admin WHERE email = ?'
  connection.query(sql2, req.body.email, (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else if (result.length) {
      res.status(409).send(`${req.body.email} existe déjà`)
    } else {
      connection.query(sql, datas, (error, resu) => {
        if (error) {
          res.status(500).send(error)
        } else {
          const id = resu.insertId
          const signUp = [id, ...datas]
          res.status(200).json(signUp)
        }
      })
    }
  })
})

module.exports = creaRouter
