const TrackingService =
  require('./tracking.service')

const Render =
  require('../../helpers/render.helper')

exports.indexPage = async (req, res) => {

  return Render.view(
    res,
    'pages/tracking/search',
    {
      title: 'Tracking Service',
      layout: 'public'
    }
  )
}

exports.search = async (req, res) => {

  try {

    const service =
      await TrackingService.search(
        req.query.tracking_code
      )

    return Render.view(
      res,
      'pages/tracking/detail',
      {
        title: 'Tracking Detail',
        layout: 'public',
        service
      }
    )

  } catch (err) {

    console.log(err)

    return Render.redirect(
      res,
      '/tracking'
    )
  }
}