module.exports = async (
  req,
  res,
  next
) => {

  try {

    if (!req.session.admin) {

      return res.redirect(
        '/auth/login'
      )
    }

    next()

  } catch (err) {

    console.log(err)

    return res.redirect(
      '/auth/login'
    )
  }
}