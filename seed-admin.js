require('dotenv').config()

const db = require('./src/config/db')
const Admin = require('./src/modules/auth/auth.model')
const AdminService = require('./src/modules/admin/admin.service')

const seedAdmin = async () => {
  try {
    // Sync database
    await db.sequelize.sync()

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      where: { email: 'admin@gmail.com' }
    })

    if (existingAdmin) {
      console.log('Admin sudah ada dengan email: admin@gmail.com')
      process.exit(0)
    }

    // Create initial admin
    const admin = await AdminService.store({
      name: 'Administrator',
      email: 'admin@gmail.com',
      password: 'admin123'
    })

    console.log('✅ Admin berhasil dibuat!')
    console.log('Email: admin@gmail.com')
    console.log('Password: admin123')
    process.exit(0)
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

seedAdmin()
