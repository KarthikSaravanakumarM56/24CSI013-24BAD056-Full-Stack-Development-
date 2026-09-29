const express = require('express');
const contactRoutes = require('./contactRoutes');

const router = express.Router();

router.use('/contacts', contactRoutes);

module.exports = router;