
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items=["Leetcode","web development","take u forward"];

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{

   const day = date.getDate();
   res.render("list", {kindOfDay: day , newListItems: items});

})


app.post("/",(req,res)=>{

    const item = req.body.newItem;
    items.push(item);
    res.redirect("/");

})


app.listen(3000,()=>{
    console.log("Server started on port 3000");
})