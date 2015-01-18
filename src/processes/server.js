var path           = require('path')
var BridgesExpress = require('bridges-express')
var port           = process.env.PORT || 5000
var bodyParser     = require('body-parser');
var express        = require('express');

module.exports = function(models) {

  var app = express();
  app.use(bodyParser.json());

  var server = new BridgesExpress({
    app: app,
    directory: path.join(__dirname, '..'),
    controllers: {
      inject: [models]
    }
  })

  server.listen(port, function() {
    console.log('listening on port', port)
  })
}


