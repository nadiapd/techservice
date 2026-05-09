module.exports = async (
  req,
  res,
  next
) => {

  try {

    const token =
      req.cookies?.token

    /**
     * Belum login
     */

    if (!token) {
      return next()
    }

    /**
     * Sudah login
     */

    return res.redirect(
      '/dashboard'
    )

  } catch (err) {

    console.log(err)

    return next()
  }
}