const Prisma = require('@prisma/client').PrismaClient
const prisma = new Prisma()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

router.get('/me', async function(req, res) {
  const user = await prisma.user.findOne({
    where: { id: req.user.id },
    select: {
      name: true,
      email: true,
      id: true,
      password: false
    }
  })
  if (!user) {
    return res.status(401).json({
      error: {
        message: 'User not found'
      }
    })
  }
  res.json({
    error: null,
    user
  })
})

router.post('/me/updatePassword', async function(req,res){
  const newPsw = req.body.password
  const user = await prisma.user.update({where: { id: req.user.id},data:{
    password: bcrypt.hashSync(newPsw, 3)
  }})
  res.json({error: null, user})
})

router.get('/redes', async function(req, res) {
  const redes = await prisma.microRedes2.findMany({
    select: {
      id: true,
      color: true,
      foto: true,
      familia: true,
      n_de_paredes_de_la_espora: true,
      pais: true,
      tamanio_um: true,
      textura_de_la_espora: true,
      tombre_cientifico: true,
      informacion_de_la_especie: true
    }
  })
  res.json(redes)
})

router.get('/redes/image/:id', async function(req, res) {
  const id = parseInt(req.params.id)
  const image = await prisma.microRedes2.findOne({
    where: { id },
    select: {
      id: false,
      color: false,
      foto: true,
      familia: false,
      n_de_paredes_de_la_espora: false,
      pais: false,
      tamanio_um: false,
      textura_de_la_espora: false,
      tombre_cientifico: false,
      informacion_de_la_especie: false
    }
  })
  return res.json({ data: image.foto })
})

module.exports = router
