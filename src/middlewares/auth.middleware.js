// const AuthService = require('../modules/auth/auth.service')

// module.exports = async (
//   req,
//   res,
//   next
// ) => {

//   try {

//     // Check token from: Authorization header, cookies, query params, or body
//     const token = req.headers.authorization?.replace('Bearer ', '') ||
//                   req.cookies?.token ||
//                   req.query.token ||
//                   req.body.token

//     if (!token) {
//       return res.redirect('/auth/login')
//     }

//     const admin = await AuthService.verifyToken(token)

//     if (!admin) {
//       return res.redirect('/auth/login')
//     }

//     req.admin = admin
//     next()

//   } catch (err) {

//     console.log(err)

//     return res.redirect('/auth/login')
//   }
// }

const { Op } = require('sequelize')

const Response =
  require('../helpers/response.helper')

const AuthService =
  require('../modules/auth/auth.service')

const TokenModel =
  require('../modules/auth/token.model')

module.exports = async (
  req,
  res,
  next
) => {
// console.log(req.cookies)
  try {

    /**
     * Get token from cookie
     */

    const token =
      req.cookies.token
// console.log('Token from cookie:', token)
    if (!token) {

      return res.redirect(
        '/auth/login'
      )
    }

    /**
     * Delete expired token
     */

    await TokenModel.destroy({
      where: {
        expires_at: {
          [Op.lte]: new Date()
        }
      }
    })

    /**
     * Verify token
     */

    const admin =
      await AuthService.verifyToken(
        token
      )

    if (!admin) {

      res.clearCookie('token')

      return res.redirect(
        '/auth/login'
      )
    }

    /**
     * Inject admin session
     */

    req.admin = admin

    next()

  } catch (err) {

    console.log(err)

    return res.redirect(
      '/auth/login'
    )
  }
}