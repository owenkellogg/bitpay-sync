var assert     = require('assert');
var BitpaySync = require(__dirname+'/../../');
var Invoice    = BitpaySync.Invoice;
var crypto     = require('crypto');
var fixture    = require(__dirname+'/../fixtures/bitpay_callback');

var random = function() {
  var sha = crypto.createHash('sha256');
  return sha.update(crypto.randomBytes(128)).digest('hex');
}

describe('Invoice Model', function() {
  var id = random();

  it('should record the creation of a bitpay invoice', function(done) {
    var invoice = new Invoice({ id: id });

    invoice.save({}, { method: 'insert' }).then(function(invoice) {
      assert.strictEqual(invoice.get('id'), id);
      assert.strictEqual(invoice.get('paid'), false);
      assert.strictEqual(invoice.get('state'), 'invoice');
      done();
    });
  });

  it('should create a bitpay invoice using the api', function(done) {
    Invoice.generate({
      amount: 0.01,
      data: { rippleAddress: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk' }
    })
    .then(function(invoice) {
      invoice.fetch().then(function(invoice) {
        assert(invoice.get('id'));
        assert(invoice.get('url'));
        assert.strictEqual(invoice.get('data').rippleAddress, 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk');
        assert.strictEqual(invoice.get('state'), 'invoice');
        assert.strictEqual(invoice.get('paid'), false);
        done();
      });
    })
  });

  it('should record the payment of an invoice', function(done) {
    fixture.id = id;

    Invoice.pay(fixture).then(function(invoice) {
      assert.strictEqual(invoice.get('paid'), true);
      assert.strictEqual(invoice.get('state'), 'incoming');
      done();
    });
  });

  it('should clear a payment from the incoming queue', function(done) {

    var invoice = new Invoice({ id: id })

    invoice.save().then(function(invoice) {
      invoice.clear().then(function(invoice) {
        assert.strictEqual(invoice.get('state'), 'cleared');
        done();
      });
    });
  });
});

