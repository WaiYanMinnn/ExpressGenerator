const express = require('express');
const User= require('../models/user');
const passport=require('passport');
const authenticate=require('../authenticate');

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', async (req, res) => {
  try {
    const newUser = new User({ username: req.body.username });
    if (req.body.firstname) newUser.firstname = req.body.firstname;
    if (req.body.lastname) newUser.lastname = req.body.lastname;
    
    await newUser.save();

    const token = authenticate.getToken({ _id: newUser._id });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'Registration Successful', token });
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.json({ err: err });
  }
});
router.post('/login',passport.authenticate('local',{session:false}),(req,res)=>{
  const token = authenticate.getToken({_id:req.user._id});
  res.statusCode=200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success:true,token:token,status:'You are successfully Logged in !'})

});
router.get('/logout', (req,res,next)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }else{
    const err=new Error('You are not logged in');
    err.status=401;
    return next(err);


  }
});


module.exports = router;
