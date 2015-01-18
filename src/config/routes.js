
module.exports = function(router, controllers) {

  router.post('/callbacks', controllers.callbacks.create)

  router.post('/invoices', controllers.invoices.create)
  router.get('/invoices/:id', controllers.invoices.show)

  router.get(   '/notifications',     controllers.notifications.index)
  router.delete('/notifications/:id', controllers.notifications.clear)
}

