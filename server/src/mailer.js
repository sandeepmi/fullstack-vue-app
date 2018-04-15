const { createTransport } = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
const { email } = require('./config')

const transport = createTransport({
  service: email.service,
  auth: {
    user: email.user,
    pass: email.password
  }
})

const handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('./src/templates/'),
  extName: '.html'
}

transport.use('compile', hbs(handlebarsOptions))

module.exports = transport
