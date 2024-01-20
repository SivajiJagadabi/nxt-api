const express = require('express')
const app = express()
const cors=require('cors')
const mysql = require('mysql')
const PORT=process.env.PORT || 3001


app.use(cors({origin:["http://localhost:3001/signup"]}))
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'nxtsignup'
})


app.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const phone = req.body.phone

    const sql = "INSERT INTO signup (`username`,`password`,`phone`) VALUES(?)"
    const values = [username,phone,password]

    db.query(sql, [values], (err, data) => {
        console.log(values)
        if (err) {
            let error = 'Failued to statement execute:' + err.message
            console.error(error)
            res.send(error)
        }
        return res.json(data)
    })
})


app.post('/login',(req,res)=>{

    const username=req.body.username 
    const password=req.body.password 

    const sql="select * from signup where `username`=? and `password`=?"

    db.query(sql,[req.body.username,req.body.password],(err,data)=>{
        if(err){
            const error='Failued to Execute Statement'+err.message 
            console.error(error)
            return res.send(error)
        }
        if(data.length>0){
            return res.json('Success')
        }else{
            return res.json('Failure')
        }
        
    })

})


app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})

