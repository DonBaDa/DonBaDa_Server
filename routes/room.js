var express = require('express');
var router = express.Router();
var randomString = require('randomstring');
var net = require('net');

var Room = require('../models/Room')
var User = require('../models/User')

/*
require
  param: id

방 찾기
*/
router.get('/', function(req, res, next) {
  Room.findOne({id: req.param('id')}, (err, room)=>{
    if(err){
      console.log("DB Err");
      console.log(err);
      return err;
    }

    if(!room){
      console.log("Room not found");
      res.send(400, "Room not found")
    }else{
      res.send(200, room)
    }
  })
});

/*
require
  body: creditor-id
        debtor-id
        D_day
        amount
        title

방 생성
*/
router.post('/', (req, res)=>{
  User.find({id: { $in: [req.body.creditor, req.body.debtor] }}, (err, users)=>{
    if(err){
      console.log(err);
      return err;
    }
    // console.log(users);

    if(users.length != 2){
      res.send(400, "user not found")
    }else{
      room = new Room({
        creditor: users[0]._id,
        debtor: users[1]._id,
        D_day: req.body.D_day,
        amount: req.body.amount,
        title: req.body.title
      })

      room.save((err)=>{
        if(err){
          console.log("DB Save Err");
          console.log(err);
          return err;
        }

        Room.findOne({_id: room._id}).populate('creditor').populate('debtor').exec((err, data) => {
          if(err){
            console.log(err);
            return err;
          }

          users[0].credit_rooms.push(room._id)
          users[0].save()
          users[1].debt_rooms.push(room._id)
          users[1].save()

          if(!data){
            res.send(400, "not found Room")
          }else{
            res.send(200, data)
          }
        })
      })
    }
  })

})

module.exports = router
