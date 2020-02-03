const Prisma = require('@prisma/client').PrismaClient
const prisma = new Prisma()
const express = require('express')
const router = express.Router()

router.get('/redes', async function(req, res) {
  const redes = await prisma.microRedes2.findMany({
    select: {
      id,
      color,
      familia,
      n_de_paredes_de_la_espora,
      pais,
      tamanio_um,
      textura_de_la_espora,
      tombre_cientifico,
      informacion_de_la_especie
    }
  })
  res.json(redes)
})

router.get('/redes/image/:id', async function(req, res) {
  const id = req.params.id
  const image = await prisma.microRedes2.findOne({
    where: { id },
    select: { foto }
  })
  return res.json({ data: image.foto })
})

module.exports = router
