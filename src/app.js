// // const path = require('path')
// // const express = require('express')
// // const createError = require('http-errors')
// // const hbs = require('hbs')
// // const { webRoutes, apiRoutes } = require('./routes')
// // const { errorHandler, notFoundHandler } = require('./middlewares/error.middleware')
// // require('./config/env')

// // const app = express()

// // app.set('views', path.join(__dirname, 'views'))
// // app.set('view engine', 'hbs')

// // hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
// // hbs.registerHelper('formatDate', (value) => {
// //   if (!value) return '-'
// //   return new Date(value).toLocaleDateString('id-ID', {
// //     year: 'numeric',
// //     month: 'long',
// //     day: 'numeric'
// //   })
// // })

// // hbs.registerHelper('ifEquals', function (a, b, options) {
// //   return a == b ? options.fn(this) : options.inverse(this)
// // })

// // app.use(express.urlencoded({ extended: false }))
// // app.use(express.json())
// // app.use('/public', express.static(path.join(__dirname, 'public')))

// // app.use(webRoutes)
// // app.use('/api', apiRoutes)

// // app.use(notFoundHandler)
// // app.use(errorHandler)

// // module.exports = app

// require('dotenv').config()

// const express = require('express')
// const path = require('path')
// const logger = require('morgan')
// const session = require('express-session')

// const routes = require('./routes')

// const app = express()

// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'hbs')

// app.use(logger('dev'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// app.use(express.static(path.join(__dirname, 'public')))

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }))

// app.use(routes)

// module.exports = app


// // BARU v2
// require('dotenv').config()

// const express = require('express')
// const path = require('path')
// const logger = require('morgan')
// const hbs = require('hbs')
// const session = require('express-session')
// const createError = require('http-errors')

// const routes = require('./routes')

// const app = express()

// /**
//  * View Engine Setup
//  */

// app.set(
//   'views',
//   path.join(__dirname, 'views')
// )

// app.set(
//   'view engine',
//   'hbs'
// )

// /**
//  * HBS Layout Config
//  */

// hbs.registerPartials(
//   path.join(__dirname, 'views')
// )
// hbs.registerHelper(
//   'ifEquals',
//   function (a, b, options) {

//     return a == b
//       ? options.fn(this)
//       : options.inverse(this)
//   }
// )

// hbs.registerHelper(
//   'formatDate',
//   value => {

//     if (!value) return '-'

//     return new Date(value)
//       .toLocaleDateString('id-ID')
//   }
// )
// /**
//  * Middleware
//  */

// app.use(logger('dev'))

// app.use(express.json())

// app.use(
//   express.urlencoded({
//     extended: false
//   })
// )

// app.use(
//   express.static(
//     path.join(__dirname, 'public')
//   )
// )

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
//   })
// )

// /**
//  * Routes
//  */

// app.use(routes)

// /**
//  * 404 Handler
//  */

// app.use((req, res, next) => {
//   next(createError(404))
// })

// /**
//  * Error Handler
//  */

// app.use((err, req, res, next) => {

//   res.locals.message = err.message

//   res.locals.error =
//     req.app.get('env') === 'development'
//       ? err
//       : {}

//   if (err.status === 404) {

//     return res.status(404).render(
//       'errors/404',
//       {
//         title: 'Page Not Found',
//         layout: 'public'
//       }
//     )
//   }

//   return res.status(500).render(
//     'errors/500',
//     {
//       title: 'Internal Server Error',
//       layout: 'public'
//     }
//   )
// })

// module.exports = app


// BARU LAGI
require('dotenv').config()

const express = require('express')
const path = require('path')
const logger = require('morgan')
const session = require('express-session')
const createError = require('http-errors')

const {
  engine
} = require('express-handlebars')

const routes = require('./routes')

const app = express()

/**
 * Handlebars Engine
 */

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(
      __dirname,
      'views/layouts'
    )
  })
)

app.set('view engine', 'hbs')

app.set(
  'views',
  path.join(__dirname, 'views')
)

/**
 * Middleware
 */

app.use(logger('dev'))

app.use(express.json())

app.use(
  express.urlencoded({
    extended: false
  })
)

app.use(
  express.static(
    path.join(__dirname, 'public')
  )
)

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)

/**
 * Routes
 */

app.use(routes)

/**
 * 404
 */

app.use((req, res, next) => {
  next(createError(404))
})

/**
 * Error Handler
 */

app.use((err, req, res, next) => {

  if (err.status === 404) {

    return res.status(404).render(
      'errors/404',
      {
        title: 'Page Not Found',
        layout: 'public'
      }
    )
  }

  return res.status(500).render(
    'errors/500',
    {
      title: 'Internal Server Error',
      layout: 'public'
    }
  )
})

module.exports = app