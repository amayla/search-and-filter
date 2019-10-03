var express = require('express')
var bodyParser = require ('body-parser')
var cors = require ('cors')
const db = require('./database/index')

const app = express()
const port = 1110
//var urlapi = 'http://localhost:1110/'
// const fs = require('fs')


app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('hehe')
})


app.get('/getdata', (req, res) => {
    let sql = `select * from train`
    if (req.query){
        sql = `${sql} where`

        if(req.query.psgName){
            sql = `${sql} Name like '%${req.query.psgName}%' and`
        }
        if(req.query.ageMin){
            sql = `${sql} Age > ${req.query.ageMin} and`
        }
        if(req.query.ageMax){
            sql = `${sql} Age < ${req.query.ageMax} and`
        }
        if(req.query.psgSex){
            if (req.query.psgSex == 'all'){
                sql = `${sql}`
            } else {
                sql = `${sql} Sex = '${req.query.psgSex}' and`
            }
        }
        if(req.query.psgClass){
            if (req.query.psgClass == 'all'){
                sql = `${sql}`
            } else {
                sql = `${sql} Pclass = ${req.query.psgClass} and`
            }
        }
        if(req.query.psgSurvived){
            if (req.query.psgSurvived == 'all'){
                sql = `${sql}`
            } else {
                sql = `${sql} Survived = ${req.query.psgSurvived} and`
            }
        }
        sql = sql.slice(0, -4)
    }

    db.query(sql, (err, result) => {
        if(err) throw err
        res.send(result)
    })
})






app.listen(port, () => console.log("Server up in port " + port))
