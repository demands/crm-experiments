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
      refund: function(ticket) {
        console.log(ticket);
        var payload = {
          ticket: ticket.id(),
          requester: ticket.requester().email(),
          agent: ticket.assignee().user().email(),
          amount: 499,
          date: new Date()
        };
        return {
          url: 'http://crm-experiments.herokuapp.com/zendesk/refund',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(payload)
        }
      }
    },

    showHistory: function(event) {
      event.preventDefault();
      this.switchTo('history', {username: this.currentUser().name()});
    },

    showDetails: function(event) {
      event.preventDefault();
      this.switchTo('details');
    },

    refund: function(event) {
      event.preventDefault();
      this.ajax('refund', this.ticket())
    },

    refundDone: function(event) {
      services.notify('$4.99 packaging charge successfully refunded to ' + this.ticket().requester().name() + '.');

      var cannedResponse = this.comment().text();
      if(cannedResponse.trim() !== '') {
        cannedResponse += '\n\n'
      }
      cannedResponse += 'We\'ve put $4.99 back on your credit card charge from May 5. Expect an email receipt from us soon.'
      this.comment().text(cannedResponse);
    },

    refundFailure: function(event) {
      services.notify('$4.99 packaging charge was not successfully refunded!', 'error');
    },

    newLabel: function(event) {
      this.switchTo('ops_feedback');
    }
  };

}());
