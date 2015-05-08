express = require 'express'
bodyParser = require 'body-parser'

tickets = []

app = express()
app.use(bodyParser.urlencoded(extended: false))
app.use(bodyParser.json())

app.get '/desk', (req, res) ->
  res.status(200).send """
    <html>
      <head>
        <title>desk experiments</title>
      </head>
      <body>
        <h1>hej desk.com</h1>
      </body>
    </html>
  """

app.post '/zendesk/refund', (req, res) ->
  tickets.push req.body
  res.status(200).send()

app.get '/zendesk/refunds', (req, res) ->
  res.status(200).json tickets


server = app.listen process.env.PORT or 3000, ->
  {address, port} = server.address()
  console.log "App listening on http://#{address}:#{port}"
