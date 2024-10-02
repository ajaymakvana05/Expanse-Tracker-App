const TransactionModel = require('../models/transactionmodel')
const moment = require('moment')

const addTransaction = async (req, res) => {
    const { amount, description, category, paymentmethod, date, userID } = req.body;

    try {
        const newTransaction = new TransactionModel({
            amount,
            description,
            category,
            paymentmethod,
            date,
            userId: userID
        });
        await newTransaction.save();
        res.status(200).json(newTransaction);
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ error: 'Failed to add transaction' });
    }
};

const getalltransaction = async (req, res) => {
    const { userID, frequency, selectedDate } = req.body;

    try {
        const transactions = await TransactionModel.find({
            userId: userID,
            ...(frequency !== 'custom' ? {
                date: {
                    $gt: moment().subtract(Number(frequency), "d").toDate(),
                }
            } : {
                date: {
                    $gte: selectedDate[0],
                    $lte: selectedDate[1]
                }

            }),
            userId: req.body.userID,

        });
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getalltransaction,
    addTransaction
}