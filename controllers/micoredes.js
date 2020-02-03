const Prisma = require('@prisma/client').PrismaClient
const prisma = new Prisma()
const express = require('express')
const router = express.Router()

router.get('/redes', async function(req, res) {
  const redes = await prisma.microRedes2.findMany({
    select: {
      foto: false
    }
  })
  res.json(redes)
})

router.get('/redes/image/:id', async function(req, res) {
  const id = req.params.id
  const image = await prisma.microRedes2.findOne({
    where: { id },
    select: { foto: true }
  })
  return res.json({ data: image.foto })
})

module.exports = router
