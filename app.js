const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// Handlers de errores
const AppError = require('./Helpers/appError');
const globalErrorHandler = require('./middlewares/globalErrorHandler');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  //res.header('', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  next();
});
app.use(cors());
// muestra logs de rutas llamadas (solo usar en development, nunca en produccion)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// ruta libre de archivos
app.use('/u/', express.static(`${__dirname}/Files/uploads/users/images`));
app.use('/u/', express.static(`${__dirname}/Files/uploads/users/docs`));
// Rutas divididas en modulos
app.use('/OAuth', require('./Routes/auth.routes'));
app.use('/u', require('./Routes/usuario.routes'));
app.use('/', require('./Routes/CA.routes'));
app.use('/pro', require('./Routes/prodep.routes'));

// Cualquier llamada a ruta no especificada, regresar error 404
app.all('*', (req, res, next) => {
  next(
    new AppError(`No existe la ruta: ${req.originalUrl} en este servidor!`, 404)
  );
});

// middleware para regresar el error con la informacion del causante al cliente
app.use(globalErrorHandler);
app.use(express.static('www'));
module.exports = app;
