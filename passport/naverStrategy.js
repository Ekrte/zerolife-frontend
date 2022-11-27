const passport = require('passport');
const { Strategy: NaverStrategy, Profile: NaverProfile } = require('passport-naver-v2');
const axios = require('axios');
const genPassHash = require('../utils/getPassHash');
require('dotenv').config();
 
module.exports = () => {
   passport.use(
      new NaverStrategy(
         {
            clientID: process.env.NAVER_ID,
            clientSecret: process.env.NAVER_SECRET,
            callbackURL: '/auth/naver/callback', // 카카오 로그인 Redirect URI 경로
         },
         async (accessToken, refreshToken, profile, done) => {
            console.log('naver profile : ', profile);
            const { nickname, email } = profile;
            
            axios
               .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/apis/auth/token`,
                  { 
                     provider: "NAVER",
                     email: email, 
                     password: genPassHash("NAVER", email),
               })
               .then((response) => {
                  try {
                     done(null, { 
                        email: email, 
                        provider: "NAVER", 
                        nickname: nickname,
                        jwtToken: response.data.accessToken,
                     });
                  } catch (error) {
                     done(error);
                  }
               })
               .catch((error) => {
                  done(null, { 
                     email: email, 
                     provider: 'NAVER',
                     nickname: nickname,
                  });
               });
         },
      ),
   );
};