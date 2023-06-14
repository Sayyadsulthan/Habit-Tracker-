const express = require('express');
 require('dotenv').config();


const PORT = process.env.PORT || 8000;
const app = express();
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocals = require('./config/passport-local-strategy');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/custom_middleware');

app.use(express.urlencoded({extended:true}))
app.use(expressLayouts);

app.use(express.static('./assets'));

// setting the partial script an styles 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup the views and view engine
app.set('view engine', 'ejs');
app.set('views', './views');



// mongostore is used to store the session in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            
            mongoUrl: process.env.DB_URI,
            autoRemove: 'disabled'
        }
    )
}));

// initializing the passport and flash
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);


app.use('/', require('./routes'));

app.listen(PORT, function(err){
    if(err){
        console.log("err in listening server");
    }

    console.log(" listening server listening on port: ", PORT);

})
