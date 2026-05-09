exports.notFoundHandler = (req, res, next) => {
  res.status(404)
  return res.render('errors/404', {
    title: 'Halaman Tidak Ditemukan',
    url: req.originalUrl
  })
}

exports.errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err)

  res.status(err.status || 500)
  return res.render('errors/500', {
    title: 'Terjadi Kesalahan',
    message: err.message || 'Internal server error'
  })
}
