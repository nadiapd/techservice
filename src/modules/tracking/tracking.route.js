const router = require('express').Router()

const Controller = require('./tracking.controller')

router.get('/', Controller.indexPage)
router.get('/tracking', Controller.search)

module.exports = router