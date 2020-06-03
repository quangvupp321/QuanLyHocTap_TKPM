//const passport = require('passport');
//strategy for login with acoount, facebook, google
const LocalStrategy  = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

//
const account = require('../models/user_model');
const bcrypt = require('bcrypt');
const func = require('../utils/extensionFunc'), run  = func.errorHandle;

//static vaiable 
const FACE_APP_KEY ='2288834308073481';
const FACE_APP_SECRET = 'c767c27066be73696f0c8fec6ea255ba';

module.exports = (passport) => {   
    passport.serializeUser((user,done) => {       
        done(null,user.f_userID);
    });

    passport.deserializeUser(async (id,done) =>{
        const [user,err] = await run(account.getByUserID(id));
        done(err,user);
    });

    passport.use(
        new LocalStrategy(async (username, password, done)=> {
        //error handling

        const [user,err] = await run(account.getByUserName(username));
        if (err)
        {
            return done(err);
        }
        
        if (!user)
        {
            return done(null, false, { message: 'Incorrect username or password.' });
        }

        else if (!bcrypt.compareSync(password,user.f_password))
        {
            return done(null, false, { message: 'Incorrect username or password.' });
        }

        return done(null, user);
    }));

    // passport.use('face-auth',new FacebookStrategy({
    //     //infor to make confirm with facebook
    //     clientID: FACE_APP_KEY,
    //     clientSecret: FACE_APP_SECRET,
    //     callbackURL: "http://127.0.0.1:3000/account/profile",
    //     profileFields: ['name', 'email','birthday','address'],
    //   },(token, refreshToken, profile, done) =>{
    //        // token and profile of user you require




    // //         return done(null,user);
    // }));
}