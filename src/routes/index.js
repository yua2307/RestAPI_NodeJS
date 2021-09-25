const feedRouter = require('./feed')

function route(app) {
    app.use('/feeds', feedRouter)
}

module.exports = route;