zendesk = require 'node-zendesk'
client = zendesk.createClient
  username: 'max@goodeggs.com'
  token: 'TRD2QduWLDP2Tg90uInhxkqTng0V4z48JlEBdITt'
  remoteUri: 'https://goodeggs-trial.zendesk.com/api/v2'
  subdomain: 'goodeggs-trial'

ticket = ticket:
  subject: 'My avocadoes are too squishy.'
  type: 'problem'
  requester_id: '929647517'
  comment:
    body: "They seemed great when I bought them, but then they got squishy. I want a refund!"

client.tickets.create(ticket, console.log)
