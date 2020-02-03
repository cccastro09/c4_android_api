const jwt = require('jsonwebtoken')
const config = require('../config.js')
const bcrypt = require('bcrypt')
const Prisma = require('@prisma/client').PrismaClient
const prisma = new Prisma()
const express = require('express')
const router = express.Router()

router.post('/signup', async function(req, res) {
  let password = req.body.password
  let name = req.body.name
  let email = req.body.email
  if (!email || !password || !name) {
    res.status(400).json({
      error: {
        message: 'Please fill all fields'
      }
    })
    return
  }
  let user = await prisma.user.findOne({
    where: {
      email: email
    }
  })
  if (user) {
    res.status(400).json({
      error: {
        message: 'Email already registered!'
      }
    })
    return
  }
  await prisma.user.create({
    data: {
      password: bcrypt.hashSync(password, 3),
      name,
      email
    }
  })
  res.json({
    message: 'User registered successfully',
    error: null
  })
})
router.post('/login', async function(req, res) {
  /*
   * Check if the username and password is correct
   */
  let email = req.body.email
  let password = req.body.password
  if (!email || !password) {
    res.status(400).json({
      error: {
        message: 'Please fill all fields'
      }
    })
    return
  }
  let user = await prisma.user.findOne({
    where: {
      email: email
    }
  })
  if (!user) {
    res.status(401).json({
      error: {
        message: 'Wrong username or password!'
      }
    })
    return
  }
  if (bcrypt.compareSync(password, user.password)) {
    res.json({
      id: user.id,
      name: user.name,
      jwt: jwt.sign(
        {
          id: user.id
        },
        config.JWT_SECRET,
        { expiresIn: 60 * 60 }
      ),
      error: null
    })
  } else {
    /*
     * If the username or password was wrong, return 401 ( Unauthorized )
     * status code and JSON error message
     */
    res.status(401).json({
      error: {
        message: 'Wrong username or password!'
      }
    })
  }
})
module.exports = router
