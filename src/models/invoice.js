var Promise = require('bluebird');
var invoiceGenerator = require(__dirname+'/../lib/invoice_generator');

module.exports = function(bookshelf) {

  return bookshelf.Model.extend({
    tableName: 'invoices',
    defaults: {
      paid : false,
      state: 'invoice'
    },
    parse: function(attrs) {
      try {
        var data = JSON.parse(attrs.data);
        attrs.data = data;
      } catch (error) { }
      return attrs;
    },
    clear: function() {
      return this.set({
        state: 'cleared'
      })
      .save()
    },
    hasTimestamps: ['createdAt', 'updatedAt'] 
  }, {
    pay: Promise.method(function(payment) {
      if (!payment) {
        return Promise.reject(new Error('invalid payment'));
      }
      return new this({ id: payment.id }).fetch()
        .then(function(invoice) {
          if (!invoice) {
            return Promise.reject(new Error('invoice not found'));
          }
          if (invoice.get('state') !== 'invoice') {
            return Promise.reject(new Error('invoice already paid'));
          }
          if (payment.status !== 'confirmed') {
            return Promise.reject(new Error('payment not confimred'));
          }
          return invoice.set({
            url    : payment.url,
            data   : payment.posData,
            amount : Number(payment.btcPaid),
            paid   : true,
            state  : 'incoming',
          }).save()
        });
    }),
    
    generate: function(options) {
      var _this = this;
      return invoiceGenerator.getNewInvoice(options)
        .then(function(invoice) {
          var record = new _this();
          return record.save({
            id: invoice.id,
            url: invoice.url,
            data: invoice.posData
          }, {
            method: 'insert'
          })
        });
    }
  })
}

