const router = require('express').Router()

router.use('/', require('../modules/tracking/tracking.route'))
router.use('/auth', require('../modules/auth/auth.route'))
router.use('/dashboard', require('../modules/dashboard/dashboard.route'))
router.use('/services', require('../modules/service/service.route'))
router.use('/customers', require('../modules/customer/customer.route'))
router.use('/categories', require('../modules/category/category.route'))

module.exports = router