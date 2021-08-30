const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('esto en un get a types')
})


router.post('/', (req, res)=>{
    res.send('esto en un post a types')
})

module.exports=router