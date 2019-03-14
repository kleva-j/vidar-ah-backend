import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User } from '../models';


/**
     * callback function for google strategy
     * @param {object} accessToken authorization token
     * @param  {object} refreshToken authorization token
     * @param  {object} profile a user profile
     * @param {function} done end of function
     * @returns {function} callback
     */
export const googleSocial = async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  /**
       * @description - finds an existing user or create a new user
       * @param {object} user a user
       * @param {function} done end of function
       * @returns {object} createOrFindUser
       */
  const {
    displayName,
    name: { givenName }
  } = profile;
  const user = await User.findOrCreate({
    where: { email },
    defaults: {
      name: displayName,
      username: givenName,
      email
    }
  });
  return done(null, user[0].dataValues);
};
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.HOST_URL}/api/v1/auth/google/callback`,
  }, googleSocial

));

/**
   * callback function for facebook strategy
   * @param {object} accessToken authorization token
   * @param  {object} refreshToken authorization token
   * @param  {object} profile a user profile
   * @param {function} done end of function
   * @returns {function} callback
   */
export const facebookSocial = async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  const splitName = profile.displayName.split(' ');
  const username = splitName[0];
  /**
   * @description - finds an existing user or create a new user
   * @param {object} user a user
   * @param {function} done end of function
   * @returns {object} createOrFindUser
   */
  const { displayName } = profile;
  const user = await User.findOrCreate({
    where: { email },
    defaults: {
      name: displayName,
      username,
      email
    }
  });
  return done(null, user[0]);
};

passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${process.env.HOST_URL}/api/v1/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'email']
  }, facebookSocial
));


export default passport;
