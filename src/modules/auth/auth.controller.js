const Validation = require('./auth.validation')
const Service = require('./auth.service')

const Render = require('../../helpers/render.helper')

exports.loginPage = async (req, res) => {

  return Render.view(
    res,
    'pages/auth/login',
    {
      title: 'Admin Login',
      layout: 'auth'
    }
  )
}

exports.login = async (req, res) => {

  try {

    const validation =
      Validation.login(req.body)

    if (validation.fails()) {

      return Render.view(
        res,
        'pages/auth/login',
        {
          title: 'Admin Login',
          layout: 'auth',
          errors: validation.errors.all(),
          old: req.body
        }
      )
    }

    const admin =
      await Service.login(req.body)

    if (!admin) {

      return Render.view(
        res,
        'pages/auth/login',
        {
          title: 'Admin Login',
          layout: 'auth',
          message: 'Invalid email or password'
        }
      )
    }

    req.session.admin = admin

    return Render.redirect(
      res,
      '/dashboard'
    )

  } catch (err) {

    console.log(err)

    return Render.redirect(
      res,
      '/auth/login'
    )
  }
}

exports.logout = async (req, res) => {

  req.session.destroy(() => {

    return Render.redirect(
      res,
      '/auth/login'
    )
  })
}