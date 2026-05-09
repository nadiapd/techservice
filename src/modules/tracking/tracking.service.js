const Model =
  require('../service/service.model')

exports.search = async tracking_code => {

  return await Model.findOne({
    where: {
      tracking_code
    }
  })
}