
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const { MongoClient } = require('mongodb');

async function insertData() {
  const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('todolistDB'); // Replace with your database name
    const collection = database.collection('items'); // Replace with your collection name

    const data = [
      { name: 'Item 1' },
      { name: 'Item 2' },
      { name: 'Item 3' },
    ];

    const result = await collection.insertMany(data);

    console.log(`${result.insertedCount} documents inserted`);
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    client.close();
  }
}

insertData();


app.get("/",(req,res)=>{

   res.render("list", {kindOfDay: "Today" , newListItems: items});

})


app.post("/",(req,res)=>{

    const item = req.body.newItem;

    if(req.body.list === "work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

})


app.listen(3000,()=>{
    console.log("Server started on port 3000");
})