const { Router } = require('express');
const express = require('express');
const path = require('path');
const routes = require('./routes');
const configs = require('./config');
const bodyParser = require('body-parser');
require('dotenv').config({ path: path.resolve('variables.env') })

console.log(process.env.BD_NOMBRE)
console.log(process.env.BD_USER)
console.log(process.env.BD_PASS)
console.log(process.env.BD_HOST)
console.log(process.env.BD_PORT)

const db = require('./config/database');
db.authenticate()
    .then(() => console.log('DB conectada'))
    .catch(error => console.log(error));

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.use(express.static('public'));

const config = configs[app.get('env')];

app.locals.titulo = config.nombresitio;

app.use((req,res,next) => {
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    return next();
});

app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => console.log('El servidor está funcionando'));