var knex      = require(__dirname+'/../config/database');
var bookshelf = require('bookshelf')(knex);

module.exports = {
  Invoice: require(__dirname+'/invoice')(bookshelf)
}

