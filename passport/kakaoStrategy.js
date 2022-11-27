const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const axios = require('axios');
const genPassHash = require('../utils/getPassHash');
require('dotenv').config();
 
module.exports = () => {
   passport.use(
      new KakaoStrategy(
         {
            clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
            callbackURL: '/auth/kakao/callback', // 카카오 로그인 Redirect URI 경로
         },
         async (accessToken, refreshToken, profile, done) => {
             console.log(profile);
            const { id, kakao_account, properties } = profile._json;
            console.log(`email: ${kakao_account.email}`);

            axios
               .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/apis/auth/token`,
                  { 
                     provider: "KAKAO",
                     email: kakao_account.email, 
                     password: genPassHash('KAKAO', kakao_account.email),
               })
               .then((response) => {
                  try {
                     done(null, { 
                        email: kakao_account.email, 
                        provider: 'KAKAO', 
                        nickname: properties.nickname,
                        jwtToken: response.data.accessToken,
                     });
                  } catch (error) {
                     done(error);
                  }
               })
               .catch((error) => {
                  console.log("ID doesn't exist!!!");
                  done(null, { 
                     email: kakao_account.email, 
                     provider: 'KAKAO',
                     nickname: properties.nickname,
                  });
               });
            
         },
      ),
   );
};