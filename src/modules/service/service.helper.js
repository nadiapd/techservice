const getServices = services => {

  const result = []

  Object.values(services).forEach(
    (
      service,
      index
    ) => {

      const obj = {}

      obj.id = service.id

      obj.tracking_code =
        service.tracking_code

      obj.customer_name =
        service.customer?.name || service.customer_name

      obj.customer_email =
        service.customer?.email || service.customer_email

      obj.customer_phone =
        service.customer?.phone || service.customer_phone

      obj.device_category =
        service.device_category

      obj.device_category_other =
        service.device_category_other

      obj.device_name =
        service.device_name

      obj.device_brand =
        service.device_brand

      obj.complaint =
        service.complaint

      obj.status =
        service.status

      obj.created_at =
        service.createdAt

      result[index] = obj
    }
  )

  return result
}

const getService = service => {

  if (!service) {
    return null
  }

  return {
    id: service.id,
    tracking_code:
      service.tracking_code,
    customer_name:
      service.customer_name,
    customer_email:
      service.customer_email,
    customer_phone:
      service.customer_phone,
    device_name:
      service.device_name,
    device_brand:
      service.device_brand,
    complaint:
      service.complaint,
    status:
      service.status,
    created_at:
      service.createdAt
  }
}

module.exports = {
  getServices,
  getService
}