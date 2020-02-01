const Prisma = require('@prisma/client').PrismaClient
const prisma = new Prisma()
const express = require('express')

/**
 * @param {express.Router} router - The date
 */
module.exports = function(router) {
  router.post('/redes', async function(req, res) {
    const redes = await prisma.microredes.findMany()
    res.json(redes)
  })
}
