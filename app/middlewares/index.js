const bodyParser = require('body-Parser')
const cors = require('cors')
module.exports = (app) => {
    app.use(cors())
    app.use(bodyParser.json())
}
