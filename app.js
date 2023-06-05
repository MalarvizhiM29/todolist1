
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB', {
  useNewUrlParser: true,
})

const itemsSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});
 
const item2 = new Item({
  name: "Hit the + button to add a new item."
});
 
const item3 = new Item({
  name: "<-- Hit this to delete an item."
});
 
const defaultItems = [item1, item2, item3];

app.get("/", function(req, res) {

  Item.find({})
  .then(foundItems => {

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems)
        .then(() => {
          console.log('Items inserted successfully!');
        })
        .catch((error) => {
          console.error(error);
        });
        res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });

  item.save();
  res.redirect("/");

});

app.post("/delete", function(req,res){
  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId)
  .then((removedDocument) => {
    if (removedDocument) {
      console.log('Document removed successfully:', removedDocument);
      res.redirect("/");
    } else {
      console.log('No document found with the provided ID:', documentId);
    }
  })
  .catch((error) => {
    console.error('Error occurred while removing document:', error);
  });

});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000,()=>{
    console.log("Server started on port 3000");
})