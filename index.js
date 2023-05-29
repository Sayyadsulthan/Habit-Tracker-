const express = require('express');
const env = require('dotenv');

env.config();

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

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


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
            
            mongoUrl: "mongodb+srv://asulthan088:12345@newcluster.pvhb9aa.mongodb.net/newproject?retryWrites=true&w=majority",
            autoRemove: 'disabled'
        }
    )
}));


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
