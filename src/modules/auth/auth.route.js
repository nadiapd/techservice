const router = require('express').Router()

const Controller = require('./auth.controller')

router.get(
  '/login',
  Controller.loginPage
)

router.post(
  '/login',
  Controller.login
)

router.get(
  '/logout',
  Controller.logout
)

module.exports = router