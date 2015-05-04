express = require 'express'
app = express()

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

app.get '/zendesk', (req, res) ->
  res.status(200).send """
    <html>
      <head>
        <title>zendesk experiments</title>
      </head>
      <body>
        <h1>hola zendesk</h1>
      </body>
    </html>
  """


server = app.listen process.env.PORT or 3000, ->
  {address, port} = server.address()
  console.log "App listening on http://#{address}:#{port}"
