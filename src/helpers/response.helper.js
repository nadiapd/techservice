exports.success = (res, result = [], message = 'success') => {
  return res.status(200).json({
    code: 200,
    status: 'success',
    message,
    result
  })
}

exports.error = (res, error = 'something went wrong', code = 500) => {
  return res.status(code).json({
    code,
    status: 'error',
    message: error.message || error
  })
}
