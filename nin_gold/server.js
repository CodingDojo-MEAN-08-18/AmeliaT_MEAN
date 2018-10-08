const express = require('express');
const bodyParser = require('body-parser');
const path = require ('path');

const port = process.env.PORT || 8000;
const app = express();

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static( __dirname + '/dist/public' ))
  .use(bodyParser.json())
  .set('port', port)

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(port, () => console.log(`Express server listening on port ${ port }`));
