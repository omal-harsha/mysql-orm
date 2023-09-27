const express = require("express");

const app = express()
app.use(express.json())
const mysql = require("mysql2")

const db = require("./models")
const {User} = require('./models')

app.get('/select-all', (req,res) => {
    User.findAll()
    .then((users) => {
        res.send(users)
    })
    .catch((err) => {
        console.log(err)
    })
})

app.get('/select-one', (req,res) => {

    const {id} = req.query

    User.findOne({where: {id:id}})
    .then((users) => {
        res.send(users)
    })
    .catch((err) => {
        console.log(err)
    })
})

app.post('/insert', (req,res) => {

    const {firstName, age} = req.body
    User.create({
        firstName, 
        age
    }).then((user) => {
        res.status(201).json({ message: "User created successfully", user });
    }).catch((err) => {
        if(err){
            console.log(err)
        }
    })
    console.log("user insert")
})

app.delete('/delete', (req,res) => {
    const {id} = req.query
    User.destroy({where: {id:id}})
    .then((result)=> {
        res.status(201).json({ message: "User deleted successfully", result });
    })
    .catch((err) => {
        if(err){
            console.log(err)
        }
    })
    
})



db.sequelize.sync().then((req) => {

    app.listen(3001, ()=> {
        console.log("server running")
    })
})
