express = require 'express'
bodyParser = require 'body-parser'

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
  console.log req.body
  res.status(200).send()

server = app.listen process.env.PORT or 3000, ->
  {address, port} = server.address()
  console.log "App listening on http://#{address}:#{port}"
