var InvoiceGenerator = require('bitpay-invoice-generator')

var invoiceGenerator = new InvoiceGenerator({
  apiKey: process.env['BITPAY_API_KEY'],
  notificationURL: process.env['BITPAY_NOTIFICATION_URL']
})

module.exports = invoiceGenerator; 

