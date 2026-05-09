const router = require('express').Router()

const Controller = require('./service.controller')

router.get('/', Controller.indexPage)
router.get('/create', Controller.createPage)
router.post('/', Controller.store)
router.get('/:id', Controller.detailPage)
router.put('/:id/status', Controller.updateStatus)

module.exports = router