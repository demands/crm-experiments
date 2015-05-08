(function() {

  return {
    events: {
      'app.activated': 'showHistory',
      'click .details': 'showDetails',
      'click .history': 'showHistory',
      'click .refund': 'refund',
      'refund.done': 'refundDone',
      'refund.fail': 'refundFailure',
      'ticket.custom_field_25731307.changed': 'newLabel'
    },

    requests: {
      fetchHeartyQuote: {
        url: 'http://www.iheartquotes.com/api/v1/random',
        type: 'GET',
        dataType: 'json'
      }
    },

    showHistory: function(event) {
      event.preventDefault();
      this.ajax('fetchHeartyQuote').always(function(data) {
        console.log('fetched quote', data)
      });
      this.switchTo('history', {username: this.currentUser().name()});
    },

    showDetails: function(event) {
      event.preventDefault();
      this.switchTo('details');
    },

    refund: function(event) {
      event.preventDefault();
      this.ajax('refund')
    },

    refundComplete: function(event) {
      var cannedResponse = this.comment().text();
      if(cannedResponse.trim() !== '') {
        cannedResponse += '\n\n'
      }
      cannedResponse += 'We\'ve put $4.99 back on your credit card charge from May 5. Expect an email receipt from us soon.'
      this.comment().text(cannedResponse);
      services.notify('$4.99 packaging charge successfully refunded to ' + this.ticket().requester().name() + '.');
    },

    newLabel: function(event) {
      this.switchTo('ops_feedback');
    },

    gotQuote: function(event) {
      services.notify('Hearty quote received')
    }
  };

}());
