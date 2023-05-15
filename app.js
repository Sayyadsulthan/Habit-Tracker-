const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocals = require('./config/passport-local-strategy');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressLayouts);

app.set('Layout extractStyles', true);
app.set('Layout extractScripts', true);

app.use(express.static('./assets'))

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
            
            mongoUrl: "mongodb://127.0.0.1:27017/session",
            autoRemove: 'disabled'
        }
    )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


app.use('/', require('./routes'))

app.listen(port, function(err){
    if(err){
        console.log("err in listening server");
    }

    console.log(" listening server listening on port: ", port);

})