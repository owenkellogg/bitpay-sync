
module.exports = function(router, controllers) {

  router.post('/callbacks', controllers.callbacks.create);

  router.get('/payments', controllers.payments.incoming)
  router.delete('/payments/:id', controllers.payments.clear)
}

