
module.exports = function(models) {

  return {

    index: function(req, res, next) {

      models.Invoice.query({ where: {
        state: 'incoming',
        paid : true
      }})
      .fetchAll()
      .then(function(invoices) {
        res.status(200).send({
          success: true,
          notifications: invoices
        });
      })
      .error(next);
    },
  
    clear: function(req, res, next) {
      
      new models.Invoice({ id: req.params.id }).fetch()
        .then(function(invoice) {
          if (!invoice) {
            next(new Error('invoice not found'));
          }
          return invoice.set({ state: 'cleared' }).save()
            .then(function(invoice) {
              res.status(200).send({
                success: true,
                notification: invoice
              });
            })
        })
        .error(next);
    }
  }
}

