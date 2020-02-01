const jwt = require('jsonwebtoken')
const config = require('../config.js')
const bcrypt = require('bcrypt')
const Prisma = require('@prisma/client').PrismaClient
const prisma = new Prisma()
const express = require('express')

/**
 * @param {express.Router} router - The date
 */
module.exports = function(router) {
  router.post('/signup', async function(req, res) {
    let password = req.body.password
    let name = req.body.name
    let email = req.body.email
    let user = await prisma.user.findOne({
      where: {
        email: email
      }
    })
    if (user) {
      res.status(40).json({
        error: {
          message: 'Email already registered!'
        }
      })
    }
    let user = await prisma.user.create({
      data: {
        password,
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
    }
    if (user.password === bcrypt.hashSync(password)) {
      res.json({
        id: user.id,
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

  return router
}
