const app = require('express')()
require('dotenv').config()

const port = process.env.PORT

app.listen(port, ()=>{
    console.log("Server is running on Port :", port)
})