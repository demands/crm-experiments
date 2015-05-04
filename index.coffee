express = require 'express'
app = express()

app.get '/', (req, res) ->
  res.status(200).send """
    <html>
      <head>
        <title>crm experiments</title>
      </head>
      <body>
        <h1>hello world</h1>
      </body>
    </html>
  """

server = app.listen process.env.PORT or 3000, ->
  {address, port} = server.address()
  console.log "App listening on http://#{address}:#{port}"
