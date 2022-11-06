const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
require('dotenv').config();
// const User = require('../models/user');
 
module.exports = () => {
   passport.use(
      new KakaoStrategy(
         {
            clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
            callbackURL: '/auth/kakao/callback', // 카카오 로그인 Redirect URI 경로
         },
         async (accessToken, refreshToken, profile, done) => {
             console.log(profile);
            const { id, kakao_account } = profile._json;
            console.log(`email: ${kakao_account.email}`);
            try {
            //    const exUser = requestUser();
            //    if (exUser) {
            //       done(null, exUser);
            //    } else {
            //       const newUser = createUser();
            //       done(null, newUser);
            //    }
               done(null, { id: kakao_account.email, jwtToken: undefined });
            } catch (error) {
               console.error(error);
               done(error);
            }
         },
      ),
   );
};