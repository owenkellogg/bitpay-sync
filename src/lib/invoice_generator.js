var InvoiceGenerator = require('bitpay-invoice-generator')
var Promise          = require('bluebird');
var http             = require('superagent');

InvoiceGenerator.prototype.getInvoiceStatus = function(id) {
  return new Promise(function(resolve, reject) {

    return http
      .get('https://bitpay.com/api/invoice/'+id)
      .auth(this.apiKey, '')
      .end(function(error, response) {
        if (error) { return reject(error) }
        resolve(response.body)
      })
  })
}

var invoiceGenerator = new InvoiceGenerator({
  apiKey: process.env['BITPAY_API_KEY'],
  notificationURL: process.env['BITPAY_NOTIFICATION_URL']
})


module.exports = invoiceGenerator; 

