'use strict'

var express = require('express');
var TransactionController = require('../controllers/transaction');
var router = express.Router();

router.get('/getData', TransactionController.getData);
router.post('/login', TransactionController.login);
router.post('/getInitialNonce', TransactionController.getInitialNonce);
router.get('/getEmail', TransactionController.getEmail);
router.post('/userCreation', TransactionController.userCreation);
router.get('/userDetails/:id', TransactionController.userDetails);
router.get('/usersDetails/:page?', TransactionController.usersDetails);
router.put('/userUpdate/:id', TransactionController.userUpdate);
router.delete('/userDelete/:id', TransactionController.userDelete);
router.post('/emailToReset', TransactionController.emailToReset);
router.put('/resetPassword', TransactionController.resetPassword);

router.post('/merchantsData', TransactionController.merchantsData);
router.post('/carriersData', TransactionController.carriersData);
router.post('/acopiosData', TransactionController.acopiosData);
router.post('/productorsData', TransactionController.productorsData);
router.post('/traceability', TransactionController.traceability);



//router.get('/');

router.get('/', function(req, res){
	res.render('index');
});


module.exports = router;
