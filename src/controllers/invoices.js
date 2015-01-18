
module.exports = function(models) {

  return {
  
    create: function(req, res, next) {
      if (Number(req.body.amount) > 0) {
        models.Invoice.generate({
          amount: req.body.amount,
          data: req.body.data
        })
        .then(function(invoice) {
          res.status(200).send({
            success: true,
            invoice: invoice
          })
        })
        .error(next)
      } else {
        next(new Error('amount must be greater than 0'))
      }
    },

    show: function(req, res, next) {
      new models.Invoice({ id: req.params.id })
        .fetch()
        .then(function(invoice) {
          if (invoice) {
            res.status(200).send({
              success: true,
              invoice: invoice
            })
          } else {
            next(new Error('invoice not found'))
          }
        })
        .error(next)
    }
  }
}

