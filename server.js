const express = require('express');
const session = require('express-session');
const next = require('next');
const passport = require('passport');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
require('./passport')();

app.prepare().then(() => {
  const server = express();
  server.use(session({ secret: 'somesecret', resave: true, saveUninitialized: false }));
  server.use(passport.initialize());
  server.use(passport.session());
  
  server.get('/auth', (req, res) => {
    const user = req?.session?.passport?.user;
    console.log(req?.session?.passport);
    console.log(user);
    return user ? res.json({
      ...user,
      jwtToken: undefined,
      accessToken: user.jwtToken
    }) : res.send(401);
  });
  
  server.get('/auth/kakao', passport.authenticate('kakao'));

  server.get('/auth/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: "/",
  }), (req, res)=>{
    const user = req?.session?.passport?.user;
    if(user?.jwtToken) {
      res.redirect('/daily-mission');
    } else {
      const { nickname, provider, email } = user;
      res.redirect(`/consent/social?nickname=${nickname}&provider=${provider}&email=${email}`);
    }
  });

  server.get('/auth/naver', passport.authenticate('naver', { authType: 'reprompt' }));

  server.get('/auth/naver/callback', passport.authenticate('naver', {
    failureRedirect: "/",
  }), (req, res)=>{
    const user = req?.session?.passport?.user;
    if(user?.jwtToken) {
      res.redirect('/daily-mission');
    } else {
      const { nickname, provider, email } = user;
      res.redirect(`/consent/social?nickname=${nickname}&provider=${provider}&email=${email}`);
    }
  });
  
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on http://192.168.0.31:${port}`)
  })
})