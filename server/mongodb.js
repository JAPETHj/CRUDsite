const express= rquire("express")
const MongoClient = require("mongodb").MongoClient

const app = express()

app.use(express.json())
var database

app.get('/',(req,res)=>{
    res.send("Welcome to api")
})

app.listen(8080,()=>{
    MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true},(error,result)=>{
        if(error) throw error
        database=result.db('prayercell')
        console.log("connection successful")
    })
})
