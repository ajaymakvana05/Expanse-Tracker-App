const express = require('express');
const { getalltransaction, addTransaction } = require('../controllers/transactioncontroller');
const router = express.Router();


router.post('/add-transaction', addTransaction);

router.post('/get-transaction', getalltransaction)

module.exports = router    