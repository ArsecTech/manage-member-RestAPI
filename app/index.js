const express = require('express')
const app = express()

require('./boot')
require('./middlewares')(app)
require('./routes')(app)
require('./middlewares/exception')(app)
require('./middlewares/404')(app)

module.exports = (port) => {
    app.listen(port, () => {
        console.log(`app is running on port: ${port}`)
    })
}
