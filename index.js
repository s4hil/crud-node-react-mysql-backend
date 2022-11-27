import express from "express"
import mysql from "mysql"
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host:"sql6.freemysqlhosting.net",
    user: " sql6581273",
    password: "4EUMUuuynG",
    database: "sql6581273"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.json("hello this is backend")
})

app.get("/users", (req, res)=>{
    const q = "SELECT * FROM `users`";
    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post("/users", (req, res)=>{
    const q = "INSERT INTO users (`name`, `email`) VALUES (?)"
    const vals = [
        req.body.name,
        req.body.email
    ];
 
    db.query(q, [vals], (err, data)=>{
        if(err) return res.json(err);
        return res.json("user has been created")
    })
})

app.listen(process.env.PORT || 8800, ()=>{
    console.log("Connected!!");
})