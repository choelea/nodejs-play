//to view es6 capabilities see http://node.green/
//node v8-options es6 module syntax currently under development (2016/06/25)
let path = require('path');
let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let loki = require('lokijs');
let routes = require('./routes');
var hbs = require('hbs');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

//setup
let database = new loki('database.loki', { autoload: true, autosave: true });
let app = express();

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

//view engine & main template
app.set('view engine', '.hbs');
hbs.registerPartials(__dirname + '/views/partials');
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
//loki db reference for the router
app.use((req, res, next) => { req.database = database; next(); });

//router
routes.create(app);

// error handler
app.use(function (err, req, res, next) {
  if (err.code && err.code == 'LIMIT_FILE_COUNT') {
    console.log(JSON.stringify(err));
    res.status(400).json(err);
  } else {
    console.log(err);
    res.status(500).send('Something broke!')
  }
})
//server
const server = http.createServer(app);

// ########################################## Websocket Testing Begins ###########################################
//  Open Browser with multiple tabs and access http://localhost:9001/websocket; try to type some message and send it out to say what will happen.
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  
  console.log((new Date()) + ' Connection accepted.');
  console.log('Current Clients:'+JSON.stringify(wss.clients))
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    wss.clients.forEach((client)=>{
      client.send(JSON.stringify({ type: 'message', data:{color:'green',author:'No One',text: message }}))
    })
  });

  ws.send('something');
});
// ########################################## Websocket Testing Ends ###########################################

server.listen(9001, function listening() {
  console.log('Listening on %d', server.address().port);
});