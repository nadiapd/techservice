// const webRoutes = require('./web.route')
// const apiRoutes = require('./api.route')

// module.exports = {
//   webRoutes,
//   apiRoutes
// }

const router = require('express').Router()

const authMiddleware = require('../middlewares/auth.middleware')

/**
 * Public Routes
 */

router.use(
  '/',
  require('../modules/tracking/tracking.route')
)

router.use(
  '/auth',
  require('../modules/auth/auth.route')
)

/**
 * Protected Routes
 */

router.use(
  '/dashboard',
  authMiddleware,
  require('../modules/dashboard/dashboard.route')
)

router.use(
  '/services',
  authMiddleware,
  require('../modules/service/service.route')
)

router.use(
  '/customers',
  authMiddleware,
  require('../modules/customer/customer.route')
)

router.use(
  '/admins',
  authMiddleware,
  require('../modules/admin/admin.route')
)

// router.use(
//   '/categories',
//   authMiddleware,
//   require('../modules/category/category.route')
// )

module.exports = router