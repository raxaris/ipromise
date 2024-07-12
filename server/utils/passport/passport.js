const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../../model/models');

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ where: { googleId: profile.id } });
        if (!user) {
            user = await User.create({
                username: normalizeString(profile.displayName),
                email: profile.emails[0].value,
                roleId: 2,
                googleId: profile.id,
                avatar: profile.photos[0].value,
                name: profile.name.givenName,
                surname: profile.name.familyName
            });
        }
        done(null, user);
    } catch (error) {
        console.log(error);
        done(error, null);
    }
}));

passport.use(new FacebookStrategy({
    clientID: process.env.META_ID,
    clientSecret: process.env.META_SECRET,
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails', 'photos']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ where: { facebookId: profile.id } });
        if (!user) {
            user = await User.create({
                username: normalizeString(profile.displayName),
                email: profile.emails[0].value,
                roleId: 2,
                facebookId: profile.id,
                avatar: profile.photos ? profile.photos[0].value : null,
                name: profile.name ? profile.name.givenName : null,
                surname: profile.name ? profile.name.familyName : null,
            });
        }

        done(null, user);
    } catch (error) {
        console.error(error);
        done(error, null);
    }
}));

function normalizeString(input) {
    return input.replace(/\s/g, '').toLowerCase();
}

module.exports = passport;
