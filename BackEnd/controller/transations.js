const Accounts = require('../models/Accounts');
const Transaction = require('../models/Transaction');

async function getTransations(req, res) {
    try {
        const transactions = await Transaction.findOne({ account_id: req.params.accountId });
        res.json(transactions ? transactions.transactions : []);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getTransBlw5000(req, res) {
    try {
        const accounts = await Transaction.aggregate([
            { $unwind: '$transactions' },
            { $match: { 'transactions.amount': { $lt: 5000 } } },
            { $group: { _id: '$account_id' } }
        ]);
        res.json({
            count: accounts.length,
            accounts: accounts
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getDistinctProducts(req, res) {
    try {
        const result = await Accounts.aggregate([
            { $unwind: '$products' },
            { $group: { _id: null, distinctProducts: { $addToSet: '$products' } } },
            { $project: { _id: 0, distinctProducts: 1 } }
        ]);
        res.json(result.length > 0 ? result[0].distinctProducts : []);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getTransations,
    getTransBlw5000,
    getDistinctProducts
};