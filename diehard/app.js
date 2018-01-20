var randomString = require('randomstring');
var { Iamporter, IamporterError } = require('iamporter');

var iamporter = new Iamporter();

// iamporter.payOnetime({
//     'merchant_uid':randomString.generate(10),
//     'amount':100,
//     'card_number': '5242-4230-0236-6897',
//     'expiry': '2023-02',
//     'birth': '000105',
//     'pwd_2digit':'09'
// }).then(result => {
//     console.log(result);
// }).catch(err => {
//     if (err instanceof IamporterError){
//         console.log(err);
//     }
// });

// iamporter.createSubscription({
//   'customer_uid': 'test_uid',
//   'card_number': '5242-4230-0236-6897',
//   'expiry': '2023-02',
//   'birth': '000105',
//   'pwd_2digit': '09'
// }).then(result => {
//   console.log(result);
// }).catch(err => {
//   if (err instanceof IamporterError){
//     console.log(err);
//   }
//     // Handle the exception
// });
//
// iamporter.getSubscription('test_uid')
//   .then(result => {
//     console.log(result)
//   })

// iamporter.paySubscription({
//   'customer_uid': 'test_uid',
//   'merchant_uid': randomString.generate(8),
//   'amount': 100
// }).then(result => {
//     console.log(result);
// }).catch(err => {
//   if (err instanceof IamporterError){
//     console.log(err)
//   }
// });
