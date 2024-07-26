const express = require('express');
const router = express.Router();

const customers = require('../controller/customer');
const transations = require('../controller/transations');


router.get('/customer', customers);

router.get('/transactions/:accountId', transations.getTransations);

router.get('/transationsBelow5000', transations.getTransBlw5000);

router.get('/distinct-products', transations.getDistinctProducts);

router.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

module.exports = router