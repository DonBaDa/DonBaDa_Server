var express = require('express');
var router = express.Router();
var randomString = require('randomstring');
var mongoose = require('mongoose');
var User = require('../models/User');



/*
  require
  param: _id

  유저 가져오기
*/
router.get('/', function(req, res, next) {
  if(req.param('id')){
    User.findOne({id: req.param('id')})
        .populate({path: 'credit_rooms', select: 'title amount D_day', populate: [{path: 'creditor', select: 'name'}, {path: 'debtor', select: 'name'}]})
        .populate({path: 'debt_rooms', select: 'title amount D_day', populate: [{path: 'creditor', select: 'name'}, {path: 'debtor', select: 'name'}]}).exec((err, user) =>{
      if(err){
        console.log("DB Err");
        console.log(e);
        return;
      }

      if(user){
        res.send(200, user)
      }else{
        res.send(400, 'user not found')
      }
    })
  }else{
    console.log('please param <id>')
    res.send(200, 'please param <id>')
  }
});


/*
  require
  param: token

  페북
*/
router.get('/fb', (req, res, next)=>{
  let token = req.param('token')
  let result = {}

  User.findOne({fb_token: token}, (err, user)=>{
    if(err){
      console.log("DB Err");
      return err;
    }

    if(user){
      console.log("User exist");
      res.send(200, )
    } else {
      console.log('User not foud');
      graph.setAccessToken(token);
      let params = {
        fields: "id, name, birthday, picture.type(large), email"
      }
      graph.get("me", params, function(err, graph) {
        // console.log(graph); // { id: '4', name: 'Mark Zuckerberg'... }
        if(err){
          console.log("ERR");
          console.log(err)
        }

        result.id = graph.id
        result.name = graph.name
        result.birth = graph.birthday
        result.picture = graph.picture.data.url
        result.email = graph.email

        user = new User({'id': result.id, 'name': result.name, 'birth': result.birth, 'email': result.email, 'picture': result.picture, 'fb_token': token})
        user.save((err)=>{
          if(err){
            console.log("DB Save Err")
            console.log(err);
          }
          res.send(200, result)
        })
      })
    }
  })
})


/*
  require
  body: _id
        name
        birth
        email
        phone

  회원가입
*/
router.post('/reg', (req, res)=>{
  console.log(req.body.id);
  User.findOne({id: req.body.id }, (err, user)=>{
    if(err){
      console.log("DB Err");
      return err;
    }

    if(user){
      user.name = req.body.name
      user.birth = req.body.birth
      user.email = req.body.email
      user.phone = req.body.phone
      user.picture = req.body.picture
      user.save()

      res.send(200, user)
    }else {
      res.send(400, 'user not found')
    }
  })
})
/*
  require
  body: _id
        card_number dddd-dddd-dddd-dddd
        expiry dddd-dd
        pw  dd
        birth dddddd

  카드등록
*/
router.post('/card', (req, res)=>{
  User.findOne({id: req.body.id}, (err, user)=>{
    if(err){
      console.log("DB Err");
      console.log(err);
      return err;
    }

    if(!user){
      console.log("user not found");
      res.send(400, "user not found")
    }else{
      iamporter.createSubscription({
        'customer_uid': req.body.id,
        'card_number': req.body.card_number,
        'expiry': req.body.expiry,
        'birth': req.body.birth,
        'pwd_2digit': req.body.pw
      }).then(result => {
        console.log(result);
        res.send(200, user)
      }).catch(err => {
        if (err instanceof IamporterError){
          console.log(err);
          res.send(400, err.raw.message);
        }
      });
    }
  })
})

module.exports = router;
