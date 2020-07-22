const express = require('express');
const morgan = require('morgan');
const exphbs = require ('express-handlebars');
const path= require('path');

//Initializations
const app = express();

//Settings
app.set('port',process.env.PORT || 8080);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname:'.hbs',
    helpers:require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Global Variables
app.use((req, res, next)=>{
    next();
});

//Routes
app.use(require('./bootstrap.js/index.js'));
app.use(require('./bootstrap.js/auth.js'));
app.use('/links', require('./bootstrap.js/links.js'));

//Public
app.use(express.static(path.join(__dirname,'public')));


//Starting the server
app.listen(app.get('port'), ()=>{
    console.log('server started', app.get('port'));
});