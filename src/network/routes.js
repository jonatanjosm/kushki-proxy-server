
const kushki = require('../components/business/kushki/network')

const routes = (server) => {
  // Api Version 1
  server.use('/api/v1/kushki', kushki);
}

module.exports = routes