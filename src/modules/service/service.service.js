const Model =
  require('./service.model')

const CustomerModel = require('../customer/customer.model')

const TrackingHelper =
  require('../../helpers/tracking.helper')

Model.belongsTo(
  CustomerModel,
  {
    foreignKey: 'customer_id',
    as: 'customer'
  }
)


exports.getAll = async () => {

  return await Model.findAll({
    include: [{
      model: CustomerModel,
      as: 'customer'
    }],
    order: [['id', 'DESC']]
  })
}

exports.getById = async id => {

  return await Model.findByPk(id, {
    include: [{
      model: CustomerModel,
      as: 'customer'
    }]
  })
}

exports.store = async payload => {
console.log(payload)
  // Create or find customer
  let customer = await CustomerModel.findOne({
    where: {
      name: payload.customer_name,
      email: payload.customer_email || null,
      phone: payload.customer_phone || null
    }
  })

  if (!customer) {
    customer = await CustomerModel.create({
      name: payload.customer_name,
      email: payload.customer_email,
      phone: payload.customer_phone
    })
  }

  payload.customer_id = customer.id
  payload.tracking_code = TrackingHelper.generateTrackingCode()
  payload.status = 'pending'

  // Remove customer fields from payload
  delete payload.customer_name
  delete payload.customer_email
  delete payload.customer_phone

  return await Model.create(payload)
}

exports.updateStatus = async (
  id,
  status
) => {

  const service =
    await Model.findByPk(id)

  service.status = status

  await service.save()

  return service
}