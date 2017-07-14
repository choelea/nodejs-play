//to view es6 capabilities see http://node.green/
//node v8-options es6 module syntax currently under development (2016/06/25)
let path = require('path');
let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let loki = require('lokijs');
let routes = require('./routes');
var hbs = require('hbs');
const session = require('express-session');

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
app.use(session({ secret: 'xiaocheng', resave: false, saveUninitialized: false }));
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
app.listen(app.get('port'), () => console.log('Listening on http://localhost:' + app.get('port')));
