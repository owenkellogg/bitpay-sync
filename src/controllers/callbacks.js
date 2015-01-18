
module.exports = function(models) {

  return {
    create: function(req, res, next) {

      models.Invoice.pay(req.body)
        .then(function(invoice) {
          res.status(200).send();
        })
        .error(next);
    }
  }
}

