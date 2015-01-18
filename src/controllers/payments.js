
module.exports = function(models) {

  return {

    incoming: function(req, res, next) {

      models.Invoice.query({ where: {
        state: 'incoming',
        paid : true
      }})
      .fetchAll()
      .then(function(invoices) {
        res.status(200).send({
          success: true,
          payments: invoices
        });
      })
      .error(next);
    },
  
    clear: function(req, res, next) {
      
      models.Invoice.fetch({ id: req.params.id })
        .then(function(invoice) {
          return invoice.set({ state: 'cleared' }).save()
            .then(function(invoice) {
              res.status(200).send({
                success: true,
                payment: invoice
              });
            })
        })
        .error(next);
    }
  }
}

