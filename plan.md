# Sistem Manajemen dan Tracking Service Perangkat Elektronik

## Project Overview

Buatkan aplikasi web untuk manajemen pelayanan dan tracking service perangkat elektronik menggunakan tanpa framework Frontend tamabahan:

- Express.js
- MySQL
- Sequelize ORM
- Handlebars (HBS)
- Tailwind CSS
- Monolith Architecture
- MVC Pattern

Aplikasi digunakan untuk:

- admin mengelola data service perangkat elektronik
- customer melakukan tracking status service menggunakan kode tracking
- sistem mengirim notifikasi ketika service selesai
- menampilkan dashboard analytics untuk admin

---

# Architecture

Gunakan:

- Monolith Architecture
- Modular MVC Structure
- Server-side Rendering menggunakan Handlebars (HBS)

Gunakan flow:

```txt
Route
 → Controller
   → Service
     → Model
       → Database
```

---

# User Role

## Admin

Admin memiliki hak akses penuh:

- login
- dashboard analytics
- CRUD data service
- CRUD customer
- CRUD kategori perangkat
- update status service
- melihat histori service
- mengirim notifikasi service selesai

---

## Customer

Customer tidak perlu login.

Customer hanya dapat:

- input kode tracking/service
- melihat status service
- melihat progress service
- melihat histori update service

---

# Service Workflow

## 1. Service Masuk

Admin menginput:

- kategori perangkat
- nama customer
- email customer
- nomor HP customer
- nama perangkat
- merk perangkat
- deskripsi kerusakan

Sistem otomatis membuat:

- tracking code / nomor service

---

## 2. Tracking Service

Customer membuka halaman:

```txt
/tracking
```

Customer memasukkan:

```txt
tracking code
```

Lalu sistem menampilkan:

- data perangkat
- status service
- progress service
- tanggal update
- catatan teknisi

---

## 3. Update Status Service

Admin dapat mengubah status menjadi:

- pending
- checking
- repairing
- completed
- cancelled

Setiap update status disimpan ke histori tracking.

---

## 4. Notifikasi

Jika status service berubah menjadi:

```txt
completed
```

Sistem mengirim notifikasi:

- email notification
- atau WhatsApp notification (optional)

---

# Struktur Folder

```txt
project-root/
│
├── bin/
│   └── www
│
├── src/
│   │
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   │   └── mailer.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── upload.middleware.js
│   │
│   ├── helpers/
│   │   ├── response.helper.js
│   │   ├── validator.helper.js
│   │   └── format.helper.js
│   │
│   ├── routes/
│   │   ├── web.route.js
│   │   ├── api.route.js
│   │   └── index.js
│   │
│   ├── views/
│   │   │
│   │   ├── layouts/
│   │   ├── partials/
│   │   ├── pages/
│   │   └── errors/
│   │
│   ├── public/
│   │   ├── css/
│   │   ├── js/
│   │   ├── images/
│   │   └── uploads/
│   │
│   ├── modules/
│   │   │
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── service/
│   │   ├── customer/
│   │   ├── category/
│   │   ├── tracking/
│   │   ├── notification/
│   │   └── analytics/
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# Module Responsibilities

## auth/

Mengelola:

- login admin
- logout admin
- authentication middleware

---

## dashboard/

Menampilkan analytics:

- total service
- total pending
- total completed
- total cancelled
- chart service per bulan
- kategori perangkat terbanyak

---

## service/

Mengelola:

- CRUD service
- update status service
- histori service
- detail perangkat

---

## customer/

Mengelola:

- data customer
- histori service customer

---

## category/

Mengelola:

- kategori perangkat elektronik

Contoh:

- laptop
- smartphone
- printer
- monitor
- televisi

---

## tracking/

Mengelola:

- pencarian tracking code
- detail progress service
- tracking page customer

---

## notification/

Mengelola:

- email notification
- template notification
- status notification

---

# Database Design

## admins

```txt
- id
- username
- password
- name
- created_at
```

---

## customers

```txt
- id
- name
- email
- phone
- created_at
```

---

## categories

```txt
- id
- category_name
- created_at
```

---

## services

```txt
- id
- tracking_code
- customer_id
- category_id
- device_name
- device_brand
- complaint
- status
- entry_date
- finished_date
- created_at
```

---

## service_logs

```txt
- id
- service_id
- status
- note
- updated_by
- created_at
```

---

# Dashboard Features

Dashboard admin harus memiliki:

- total service
- total service selesai
- total service pending
- total service dibatalkan
- grafik service bulanan
- recent activity
- quick statistics

---

# Tracking Features

Customer dapat:

- mencari service menggunakan tracking code
- melihat status terbaru
- melihat histori progress service
- melihat catatan teknisi

---

# View Engine

Gunakan:

- Handlebars (HBS)
- Layouts
- Partials
- Dynamic Rendering

Struktur views:

```txt
views/pages/
│
├── auth/
├── dashboard/
├── services/
├── customers/
├── categories/
└── tracking/
```

---

# Frontend Styling

Gunakan:

- Tailwind CSS
- responsive layout
- admin dashboard layout
- reusable components

---

# App.js Rules

`app.js` hanya untuk:

- middleware setup
- route registration
- view engine setup
- static assets
- error handling

Jangan menaruh business logic di app.js.

---

# Development Pattern

Gunakan pola coding modular seperti project enterprise Express.js:

```txt
modules/
 └── service/
      ├── service.route.js
      ├── service.controller.js
      ├── service.service.js
      ├── service.model.js
      ├── service.validation.js
      └── service.helper.js
```

Gunakan pendekatan:

- feature-based module
- modular MVC
- reusable helper
- reusable middleware
- centralized response handler

---

# Controller Rules

Controller hanya bertugas:

- menerima request
- menerima query/params/body
- memanggil service
- mengirim response
- render view

Controller tidak boleh berisi:

- business logic kompleks
- query database langsung yang panjang
- formatting data berulang

Contoh:

```js
exports.detail = async (req, res) => {
  try {
    const result = await ServiceService.detail(req.params)

    return Response.success(res, result)
  } catch (err) {
    return Response.error(res, err)
  }
}
```

---

# Service Rules

Service bertugas:

- business logic
- manipulasi data
- validasi proses bisnis
- query ke model
- transform data

Contoh:

```js
exports.detail = async ({ id }) => {
  const data = await Service.findOne({
    where: { id }
  })

  if (!data) {
    throw new Error('service not found')
  }

  return ServiceHelper.transform(data)
}
```

---

# Model Rules

Gunakan Sequelize model.

Contoh:

```js
module.exports = sequelize.define('services', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  tracking_code: Sequelize.STRING,
  status: Sequelize.STRING
})
```

Gunakan:

- underscored naming
- timestamps
- utf8mb4 charset
- relasi Sequelize

---

# Database Config Rules

Gunakan Sequelize configuration seperti:

```js
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: true,
      underscored: true
    }
  }
)
```

Jangan menjalankan:

```js
sequelize.sync()
```

langsung di config.

Lebih baik dijalankan di:

```txt
server.js
```

---

# Validation Rules

Pisahkan validation dari controller.

Gunakan:

```txt
service.validation.js
```

atau validation middleware.

Contoh:

```js
const Validator = require('validatorjs')
```

---

# Helper Rules

Gunakan helper untuk:

- transform response
- formatter
- reusable utility
- access mapping
- data transformer

Contoh:

```js
exports.transform = (data) => {
  return {
    id: data.id,
    tracking_code: data.tracking_code,
    status: data.status
  }
}
```

---

# Middleware Rules

Pisahkan middleware berdasarkan fungsi.

Contoh:

```txt
middlewares/
 ├── auth.middleware.js
 ├── role.middleware.js
 ├── error.middleware.js
 └── upload.middleware.js
```

Middleware authentication bertugas:

- validasi token/session
- validasi role
- inject session user

---

# Response Helper

Gunakan centralized response helper.

Contoh:

```js
exports.success = (res, result = [], message = []) => {
  return res.status(200).json({
    code: 200,
    status: 'success',
    message,
    result
  })
}
```

---

# Coding Rules

Gunakan:

- clean code
- modular structure
- reusable helper
- reusable middleware
- consistent naming convention
- separation of concern

---

# Why Monolith Architecture?

Karena:

- aplikasi masih skala kecil-menengah
- deployment lebih mudah
- development lebih cepat
- maintenance lebih sederhana
- cocok untuk capstone project
- tidak membutuhkan kompleksitas microservice

---

# Why MVC?

Karena:

- memisahkan logic aplikasi
- code lebih terstruktur
- mudah maintenance
- scalable
- cocok untuk aplikasi CRUD dan dashboard

---

# Package Recommendation

```json
{
  "dependencies": {
    "express": "^4.x",
    "hbs": "^4.x",
    "sequelize": "^6.x",
    "mysql2": "^3.x",
    "dotenv": "^17.x",
    "morgan": "^1.x",
    "multer": "^2.x",
    "validatorjs": "^3.x",
    "http-errors": "^2.x"
  },
  "devDependencies": {
    "nodemon": "^3.x"
  }
}
```

---

# Final Goal

Aplikasi harus:

- clean
- modular
- maintainable
- responsive
- mudah dijelaskan saat sidang
- menggunakan MVC monolith architecture
- memiliki dashboard analytics
- memiliki tracking system
- memiliki notification system
- memiliki admin management system

