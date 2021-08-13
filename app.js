//1 Invocamos Express
const express = require('express');
const app = express();

//2 Seteamos url enconded
app.use(express.urlencoded({extended:false}));
app.use(express.json())

//3 Invocamos a dontenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'})

//4 Set de directorio publico
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//5 Establecemos el motor de plantilla
app.set('view engine', 'ejs');

//6 Envocamos bcrytp para las contras encriptadas
const bcryptjs = require('bcryptjs');

//7 Variable para inicio de sesion
const session = require('express-session');
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//8 Invocamos al modulo de conexion de la BD
const connection = require('./database/db');

//9 Estableciendo las rutas
  app.get('/login',(req, res)=>{
    res.render('login')
  })
  app.get('/register',(req, res)=>{
    res.render('register')
  })

//////////////////////////////////////////
//Creamos servidor para la conexion////////
//////////////////////////////////////////
var debug = require('debug')('app:server');
var http = require('http');

/**
* Get port from environment and store in Express.
*/

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
* Create HTTP server.
*/

var server = http.createServer(app);

/**
* Listen on provided port, on all network interfaces.
*/

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
* Normalize a port into a number, string, or false.
*/

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
* Event listener for HTTP server "error" event.
*/

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}



//////////////////////////////////////////
//////////////////////////////////////////

//10 REgistracion
app.post('/register', async (req,res)=>{
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const game = req.body.game;
  const contra = req.body.contra;
  const repcontra = req.body.repcontra;
  const email = req.body.email;

  connection.query('INSERT INTO registros SET ?',{nombre:nombre, apellido:apellido, game:game, contra:contra, repcontra:repcontra, email:email}, async(error, results)=>{
    if(error){
      console.log(error);
    }else{
      res.render('register',{
        alert: true,
        alertTitle: "Registro",
        alertMessage: "REGISTRACION EXITOSA!!",
        alertIcon: 'success',
        showConfirmButton: false,
        timer:3000,
        ruta:''
      })
    }
  })
})

//11 Autenticacion
app.post('/auth', async (req, res)=>{
  const email = req.body.email;
  const contra = req.body.contra;
  if(email && contra){
    connection.query('SELECT * FROM registros WHERE email = ?', [email], async (error, results)=>{
      if(results.length == 0 || (contra != results[0].contra)){
        res.render('login',{
          alert: true,
          alertTitle: "ERROR!",
          alertMessage: "USUARIO Y/O CONTRASEÑA INCORRECTOS",
          alertIcon: 'error',
          showConfirmButton: true,
          timer:false,
          ruta:'login'
        })
      }else{
        req.session.loggedin = true;
        req.session.nombre = results[0].nombre;
        res.render('login',{
          alert: true,
          alertTitle: "CONEXION EXITOSA",
          alertMessage: "USUARIO INGRESADO CORRECTAMENTE!!",
          alertIcon: 'success',
          showConfirmButton: false,
          timer:3000,
          ruta:''
        })
      }
    })
  }else{
    res.render('login',{
      alert: true,
      alertTitle: "ADVERTENCIA",
      alertMessage: "Por favor ingrese su email y contraseña para porder ingresar!",
      alertIcon: 'warning',
      showConfirmButton: true,
      timer:false,
      ruta:'login'
    })
  }
})

//12 Auth paginas
app.get('/', (req, res)=>{
  if(req.session.loggedin){
    res.render('indexusuario',{
      login: true,
      nombre: req.session.nombre
    });
  }else{
    res.render('index',{
      login: false,
      nombre: 'Debe iniciar sesion'
    })
  }
  })

//13 Desconectamos el usuario
app.get('/logout',(req,res)=>{
  req.session.destroy(()=>{
    res.redirect('/')
  })
})
module.exports = app;
