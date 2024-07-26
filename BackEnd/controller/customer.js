const Customers = require("../models/Customers");

async function customers(req, res) {
    try {
        const customers = await Customers.find({ active: true });
        console.log("customers", customers);
        res.json({
            count: customers.length,
            data: customers
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = customers;