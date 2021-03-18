'use stric'
//
global.host = 'host.docker.internal'; //host.docker.internal
global.port = {
  audit: '3000',
  users: '3001',
  merchant: '3002',
  carrier: '3003',
  acopio: '3004',
  productor: '3005'
};
global.path = {
  audit: '/exec/createUserSC',
  getInitialNonce: '/getInitialNonce',
  getEmail: '/getEmail/',
  userLogin: '/login',
  userCreation: '/userCreation',
  userRegister: '/register',
  userDetails: '/userDetails/',
  usersDetails: '/usersDetails/',
  userUpdate: '/userUpdate/',
  userDelete: '/userDelete/',
  merchant: '/merchantsData',
  carrier: '/carriersData',
  acopio: '/acopiosData',
  productor: '/productorsData'
};
//
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');

//New
var logger = require('morgan');
//New


var app = express();

//Cargar rutas
//var user_routes = require('./routes/user');
var api_gateway_routes = require('./routes/index');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//New
app.use(logger('dev'));
//New

app.use(session({
  secret: 'foo',
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: 600000
  }
}));

//Configurar cabeceras HTTP y cors
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Carga de rutas base
//app.use('/api', user_routes);
app.use('/', api_gateway_routes);

module.exports = app;
