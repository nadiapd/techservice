const config = require('../../config/db')

const Sequelize = config.Sequelize
const sequelize = config.sequelize

const Service = sequelize.define('services', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  tracking_code: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  customer_name: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  customer_email: {
    type: Sequelize.STRING(255)
  },
  customer_phone: {
    type: Sequelize.STRING(50)
  },
  device_name: {
    type: Sequelize.STRING(255)
  },
  device_brand: {
    type: Sequelize.STRING(255)
  },
  complaint: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.STRING(50),
    defaultValue: 'pending'
  }
})

module.exports = Service