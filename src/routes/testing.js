const authenticate=require('../middleware/authenticate');

const express = require('express');
const router = express.Router();
router.get('/testing',authenticate,(req,res)=>{
    console.log(req.user);

    res.status(200).json({
        message:"Testing route"
    });
});
module.exports = router;