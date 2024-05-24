const authenticate=require('../middleware/authenticate');

const express = require('express');
const router = express.Router();
router.get('/testing',authenticate,(req,res)=>{
    res.send('testing route');
});
module.exports = router;