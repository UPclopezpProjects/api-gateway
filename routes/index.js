'use strict'

var express = require('express');
var TransactionController = require('../controllers/transaction');
var router = express.Router();

router.post('/login', TransactionController.login);
router.post('/userCreation', TransactionController.userCreation);
router.get('/userDetails/:id', TransactionController.userDetails);
router.get('/usersDetails/:page?', TransactionController.usersDetails);
router.put('/userUpdate/:id', TransactionController.userUpdate);
router.delete('/userDelete/:id', TransactionController.userDelete);

router.post('/merchantsData', TransactionController.merchantsData);
router.post('/carriersData', TransactionController.carriersData);
router.post('/acopiosData', TransactionController.acopiosData);
router.post('/productosData', TransactionController.productorsData);

module.exports = router;