var express = require('express');
var router = express.Router();
var net = require('net');
var graph = require('fbgraph');
var { Iamporter, IamporterError } = require('iamporter');
var randomString = require('randomstring');

var User = require('../models/User')
var Room = require('../models/Room')

var clients = new Object();
var iamporter = new Iamporter();

// socket
var server = net.createServer()
server.on('connection', (socket)=>{
  console.log('new connection');

  socket.on('data', (_data)=>{
    var data = JSON.parse(_data)
    console.log(data.type);

    if(data.type == "set"){
      socket.name = data.id
      clients[data.id] = socket
      console.log(Object.keys(clients));
    }
  })

  socket.on('end', ()=>{
    console.log('end');
    delete clients[socket.name]
    console.log(Object.keys(clients))
  });
})

function writeData(socket, data){
  var success = !socket.write(data);
  if (!success){
    (function(socket, data){
      socket.once('drain', function(){
        writeData(socket, data);
      });
    })(socket, data);
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("server running at 2233 port")
});

/*
write facebook
require
  body: Room-id
        message
*/
router.post('/facebook', (req, res)=>{
  Room.findOne({_id: req.body.id}).populate('debtor').exec((err, room)=>{
    if(err){
      console.log("DB Err");
      console.log(err);
      return err;
    }

    if(!room){
      res.send(400, "not found room")
    }else{
      var wallPost = {
        message: req.body.message
      };
      console.log(room);
      graph.setAccessToken(room.debtor.fb_token);
      graph.post(room.debtor.id + '/feed', wallPost, (err, result)=>{
        if(err){
          console.log("FB Err");
          console.log(err);
          res.send(500, "Error")
          return err;
        }
          res.send(200, "okay")
      })
    }
  })
})

router.post('/gps', (req, res)=>{
  Room.findOne({_id: req.body.id}).populate('debtor').exec((err, user)=>{
    if(err){
      console.log(err)
      return err
    }

    if(!user){
      res.send(400, "user not found")
    }else{
      writeData(clients[user.debtor.id], 'gps')
    }
  })
})

router.post('/lock', (req, res)=>{
  Room.findOne({_id: req.body.id}).populate('debtor').exec((err, user)=>{
    if(err){
      console.log(err)
      return err
    }

    if(!user){
      res.send(400, "user not found")
    }else{
      writeData(clients[user.debtor.id], 'lock')
    }
  })
})

router.post('/sound', (req, res)=>{
  Room.findOne({_id: req.body.id}).populate('debtor').exec((err, user)=>{
    if(err){
      console.log(err)
      return err
    }

    if(!user){
      res.send(400, "user not found")
    }else{
      writeData(clients[user.debtor.id], 'sound')
    }
  })
})

router.post('/flash', (req, res)=>{
  Room.findOne({_id: req.body.id}).populate('debtor').exec((err, user)=>{
    if(err){
      console.log(err)
      return err
    }

    if(!user){
      res.send(400, "user not found")
    }else{
      writeData(clients[user.debtor.id], 'flash')
    }
  })
})
/*
  require
  body: room-id
        amount

  결제하기
*/
router.post('/pay', (req, res)=>{
  Room.findOne({_id: req.body.id}).populate('debtor').exec((err, user)=>{
    if(err){
      console.log("DB Err");
      console.log(err);
      return err;
    }

    if(!user){
      res.send(400, "room not found")
    }else{
      iamporter.paySubscription({
        'customer_uid': user.debtor.id,
        'merchant_uid': randomString.generate(8),
        'amount': req.body.amount
      }).then(result => {
          console.log(result);
          res.send(200, 'okay')
      }).catch(err => {
        if (err instanceof IamporterError){
          res.send(200, "okay")
        }
      });
    }
  })
})
module.exports = {
  route: router,
  socket: server
};
