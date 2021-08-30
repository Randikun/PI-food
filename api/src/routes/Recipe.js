const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('esto en un get a recipe')
})


router.post('/', (req, res)=>{
    res.send('esto en un post a recipe')
})

module.exports=router