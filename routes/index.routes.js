const {Router}=require('express')
const router=Router()
const path = require("path")
const passport=require('passport')
require('../passport/local-passport')
const User=require('../models/usuarios')



router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../index.html"));
})

router.get('/registro',(req,res)=>{
    res.render('./views/register.ejs')
  })

  router.post('/registro',passport.authenticate('local-/register',{
    successRedirect:'./views/login',
    failureRedirect:'./views/registro',
    passReqToCallback:true
}))

  router.get('/login',(req,res)=>{
    res.render('./views/login.ejs')
  })

  router.post('/login',passport.authenticate('local-/login',{
    successRedirect:'./views/bot',
    failureRedirect:'./views/login',
    passReqToCallback:true
}))

router.get('/bot',isAuthenticated,(req,res)=>{
  res.render('bot.ejs')
})




function isAuthenticated(req,res,next) {
  if (req.isAuthenticated()) {
      return next()
  }
  res.redirect('login')
}



module.exports = router;

