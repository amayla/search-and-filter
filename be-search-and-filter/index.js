var express = require('express')
var bodyParser = require ('body-parser')
var cors = require ('cors')
const db = require('./database/index')

const app = express()
const port = 1110
//var urlapi = 'http://localhost:1110/'
const fs = require('fs')

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('hehe')
})



app.get('/getdata', (req,res) => {
      
    db.query(`select * from train`, (err,result)=>{
    console.log(req)
    res.send(result)
})
})










app.listen(port, () => console.log("Server up in port " + port))
