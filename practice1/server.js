const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
require('dotenv').config()
const router = require('./routes/index')
// const port = process.env.PORT
// console.log(port)

app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
    watch:true
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router)

app.listen(3001,_=>{
    console.log(`server running on localhost 3001`)
})