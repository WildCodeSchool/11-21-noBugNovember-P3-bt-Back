require('dotenv').config()
const authRouter = require('express').Router()
const connection = require('../config/db.js')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

// authRouter.get('/creation', (req, res) => {
//   const sql = 'SELECT * FROM admin'
//   mysql.query(sql, (err, result) => {
//     if (err) {
//       res.status(500).send('Error retrieving data from database')
//     } else {
//       res.status(200).json(result)
//     }
//   })
// })

const getToken = req => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    return req.query.token
  }
  return null
}
authRouter.post('/protected', (req, res) => {
  const token = getToken(req)
  console.log(token)
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(403).send({ acces: false })
    } else {
      return res.status(200).send({ acces: true })
    }
  })
})

// authRouter.post('/login', async (req, res) => {
//   const { password, username } = req.body
//   console.log(password)
//   // const saltRounds = 10
//   // bcrypt.hash(password, saltRounds, function (err, hash) {
//   //   console.log(hash)
//   // })

//   if (username === 'trucbidule@gmail.com') {
//     // console.log('on est la')
//     const hashedPassword =
//       '7578ca5ba39028f7f0b0a9005de573b1187eff96afd0bfbbd2d9849e4a3973ad'
//     const verifyedPassword = await bcrypt.compare(password, hashedPassword)
//     console.log(verifyedPassword)
//     if (password === hashedPassword) {

//       // if (verifyedPassword) {
//       //   const tokenUserinfo = {
//       //     username: username,
//       //     status: 'PouletMaster'
//       //   }

//     }
//   } else {
//     res.status(500).send('Error mdp')
//   }
// })

authRouter.post('/login', async (req, res) => {
  const sql = 'SELECT id, email FROM admin WHERE email=? AND password=?'
  const values = [req.body.email, req.body.password]

  connection.query(sql, values, (err, result) => {
    if (err) throw err
    if (result.length === 0) {
      res.status(404).send('error')
    } else {
      const tokenUserinfo = {
        id: result.id,
        email: result.email,
        status: 'PouletMaster'
      }
      const token = jwt.sign(tokenUserinfo, process.env.JWT_SECRET)
      console.log(token)
      res.header('Access-Control-Expose-Headers', 'x-access-token')
      res.set('x-access-token', token)
      res.status(200).send({ mess: 'user connected' })
    }
  })
})

module.exports = authRouter
