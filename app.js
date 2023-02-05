const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
})
app.post("/", (req,res)=>{
    let url = "https://cat-fact.herokuapp.com/facts"
    https.get(url, (response)=>{
        response.on("data", (data)=>{
            let randomCatFact = Math.floor(Math.random() * 5) + 1;
            let catFact = JSON.parse(data);
            const catInfo = catFact[randomCatFact].text;
            res.send("<h1>" + catInfo + "</h1>");
        })
    })
})

app.listen(3000,()=>{
    console.log("Server is going great");
})