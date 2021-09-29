const feedRouter = require('./feed')
const authRouter = require('./auth')

function route(app) {
    app.use('/feeds', feedRouter)
    app.use('/auth', authRouter)
}

module.exports = route;