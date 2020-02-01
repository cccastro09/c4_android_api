const Prisma = require('@prisma/client').PrismaClient
const prisma = new Prisma()
const express = require('express')
const router = express.Router()

router.post('/redes', async function(req, res) {
  const redes = await prisma.microredes.findMany()
  res.json(redes)
})

module.exports = router
