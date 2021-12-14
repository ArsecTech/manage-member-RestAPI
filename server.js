require('dotenv').config()
const bootApplications = require('./app')
bootApplications(process.env.APP_PORT)