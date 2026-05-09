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
  customer_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    references: {
      model: 'customers',
      key: 'id'
    }
  },
  device_category: {
    type: Sequelize.ENUM('laptop', 'smartphone', 'printer', 'monitor', 'televisi', 'lainnya'),
    allowNull: false
  },
  device_category_other: {
    type: Sequelize.STRING(255)
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

// Define associations
Service.associate = (models) => {
  Service.belongsTo(models.Customer, {
    foreignKey: 'customer_id',
    as: 'customer'
  })
}

module.exports = Service