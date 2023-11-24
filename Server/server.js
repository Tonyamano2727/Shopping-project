const express = require("express")
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8888

app.use(express.json()) // write data client rp server

app.use(express.urlencoded({extended : true}))

app.use('/' , (req , res) =>  {res.send('Server ON')})

app.listen(port, () => {
    console.log('Server running on the port ' + port)
})