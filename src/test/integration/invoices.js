
describe('Invoices HTTP Endpoints', function() {

  it('should list all incoming paid invoices', function(done) {

    http
      .get('/v1/payments')
      .end(function(error, response) {
        assert(response.body.invoices);
      });
  });
});

