const Validator = require('validatorjs')

exports.store = body => {

  const rules = {
    customer_name: 'required',
    customer_email: 'required|email',
    customer_phone: 'required',
    device_name: 'required',
    device_brand: 'required',
    complaint: 'required'
  }

  const messages = {
    required: ':attribute is required',
    email: ':attribute invalid format'
  }

  return new Validator(
    body,
    rules,
    messages
  )
}