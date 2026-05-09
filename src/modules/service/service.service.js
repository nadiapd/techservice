const Model =
  require('./service.model')

const TrackingHelper =
  require('../../helpers/tracking.helper')

exports.getAll = async () => {

  return await Model.findAll({
    order: [['id', 'DESC']]
  })
}

exports.getById = async id => {

  return await Model.findByPk(id)
}

exports.store = async payload => {

  payload.tracking_code =
    TrackingHelper.generateTrackingCode()

  payload.status = 'pending'

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