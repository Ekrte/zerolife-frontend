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
    // console.log(req.session);
    const user = req?.session?.passport?.user;
    return user ? res.json(user) : res.send(401);
  });
  
  server.get('/auth/kakao', passport.authenticate('kakao'));

  server.get('/auth/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: "/",
  }), (req, res)=>{
    console.log("Login Success!");
    const user = req?.session?.passport?.user;
    if(user?.jwtToken) {
      res.redirect('/');
    } else {
      res.redirect('/consent/social');
    }
  });
  
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})