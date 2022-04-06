
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/importDB", {
  useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const secret = process.env.SECRET;
userSchema.plugin(encrypt,{secret: secret, encryptedFields:["password"]});

const User = mongoose.model("User", userSchema);

const itemSchema = {
  name: String,
  brand: String,
  currentAmount: Number,
  totalAmount: Number,
  location: String,
  note: String
};

const Flooring = mongoose.model("Flooring", itemSchema);
const Bathroom = mongoose.model("Bathroom", itemSchema);
const Door = mongoose.model("Door", itemSchema);
const Kitchen = mongoose.model("Kitchen", itemSchema);
const Light = mongoose.model("Light", itemSchema);

app.get("/", function(req,res){
  res.render("login");
});

app.post("/", function(req,res){
  const userName = req.body.username;
  const password = req.body.password;
  User.findOne({email:userName},function(err, foundItems){
    if(err){
      console.log(err);
    }else{
      if(foundItems){
        if(foundItems.password === password){
          res.redirect("/flooring");
        }
      }
    }
  })
});

app.get("/register", function(req,res){
  res.render("register");
});

app.post("/register", function(req,res){
  const userName = req.body.username;
  const password = req.body.password;
  const newUser = new User({
    email: userName,
    password: password
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Successful");
    }
  });
  res.redirect("/");
});

app.get("/flooring", function(req, res) {
  Flooring.find({}, function(err, foundItems) {
    res.render("Index", {
      Flooring: foundItems
    });
  });
});

app.post("/flooring", function(req, res) {
  const flooringItemName = req.body.flooringNamei;
  const flooringItemBrand = req.body.flooringBrandi;
  const flooringItemCurrentAmount = req.body.flooringCurrentAmounti;
  const flooringTotalAmount = req.body.flooringTotalAmounti;
  const flooringStorage = req.body.flooringStoragei;
  const flooringNote = req.body.flooringNotei;

  const flooring = new Flooring({
    name: flooringItemName,
    brand: flooringItemBrand,
    currentAmount: flooringItemCurrentAmount,
    totalAmount: flooringTotalAmount,
    location: flooringStorage,
    note: flooringNote
  });
  flooring.save();
  res.redirect("/flooring");
});

app.post("/deleteFlooring", function(req, res) {
  const chosenID = req.body.targetId;
  console.log(chosenID);
  Flooring.findByIdAndRemove(chosenID, function(err) {
    if (!err) {
      console.log("Successfully deleted checked item.");
      res.redirect("/flooring");
    }
  });
});

app.post("/editFlooring", function(req, res) {
  const chosenID = req.body.targetId
  const flooringItemName = req.body.flooringNameie;
  const flooringItemBrand = req.body.flooringBrandie;
  const flooringItemCurrentAmount = req.body.flooringCurrentAmountie;
  const flooringTotalAmount = req.body.flooringTotalAmountie;
  const flooringStorage = req.body.flooringStorageie;
  const flooringNote = req.body.flooringNoteie;
  Flooring.updateMany({
      _id: chosenID
    }, {
      $set: {
        "name": flooringItemName,
        "brand": flooringItemBrand,
        "currentAmount": flooringItemCurrentAmount,
        "totalAmount": flooringTotalAmount,
        "location": flooringStorage,
        "note": flooringNote
      }
    },
    function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successful");
      }
    }
  );
  res.redirect("/flooring");
});

app.get("/bathroom", function(req, res) {
  Bathroom.find({}, function(err, foundItems) {
    res.render("bathroom", {
      Bathroom: foundItems
    });
  });
});

app.post("/bathroom", function(req, res) {
  const bathroomItemName = req.body.bathroomNamei;
  const bathroomItemBrand = req.body.bathroomBrandi;
  const bathroomItemCurrentAmount = req.body.bathroomCurrentAmounti;
  const bathroomItemTotalAmount = req.body.bathroomTotalAmounti;
  const bathroomItemStorage = req.body.bathroomStoragei;
  const bathroomItemNote = req.body.bathroomNotei;

  const bathroom = new Bathroom({
    name: bathroomItemName,
    brand: bathroomItemBrand,
    currentAmount: bathroomItemCurrentAmount,
    totalAmount: bathroomItemTotalAmount,
    location: bathroomItemStorage,
    note: bathroomItemNote
  });
  bathroom.save();
  res.redirect("/bathroom");
});

app.post("/deleteBathroom", function(req, res) {
  const chosenID = req.body.targetId;
  Bathroom.findByIdAndRemove(chosenID, function(err) {
    if (!err) {
      console.log("Successfully deleted checked item.");
      res.redirect("/bathroom");
    }
  });
});

app.post("/editBathroom", function(req, res) {
  const chosenID = req.body.targetId;
  const bathroomItemName = req.body.bathroomNameie;
  const bathroomItemBrand = req.body.bathroomBrandie;
  const bathroomItemCurrentAmount = req.body.bathroomCurrentAmountie;
  const bathroomTotalAmount = req.body.bathroomTotalAmountie;
  const bathroomStorage = req.body.bathroomStorageie;
  const bathroomNote = req.body.bathroomNoteie;
  Bathroom.updateMany({
      _id: chosenID
    }, {
      $set: {
        "name": bathroomItemName,
        "brand": bathroomItemBrand,
        "currentAmount": bathroomItemCurrentAmount,
        "totalAmount": bathroomTotalAmount,
        "location": bathroomStorage,
        "note": bathroomNote
      }
    },
    function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successful");
      }
    }
  );
  res.redirect("/bathroom");
});


app.get("/door", function(req, res) {
  Door.find({}, function(err, foundItems) {
    res.render("door", {
      Door: foundItems
    });
  });
});

app.post("/door", function(req, res) {
  const doorItemName = req.body.doorNamei;
  const doorItemBrand = req.body.doorBrandi;
  const doorItemCurrentAmount = req.body.doorCurrentAmounti;
  const doorItemTotalAmount = req.body.doorTotalAmounti;
  const doorItemStorage = req.body.doorStoragei;
  const doorItemNote = req.body.doorNotei;

  const door = new Door({
    name: doorItemName,
    brand: doorItemBrand,
    currentAmount: doorItemCurrentAmount,
    totalAmount: doorItemTotalAmount,
    location: doorItemStorage,
    note: doorItemNote
  });
  door.save();
  res.redirect("/door");
});

app.post("/deleteDoor", function(req, res) {
  const chosenID = req.body.targetId;
  Door.findByIdAndRemove(chosenID, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successful");
    }
  });
  res.redirect("/door");
});

app.post("/editDoor", function(req, res) {
  const chosenID = req.body.targetId;
  const doorItemName = req.body.doorNameie;
  const doorItemBrand = req.body.doorBrandie;
  const doorItemCurrentAmount = req.body.doorCurrentAmountie;
  const doorItemTotalAmount = req.body.doorTotalAmountie;
  const doorItemStorage = req.body.doorStorageie;
  const doorItemNote = req.body.doorNoteie;

  Door.updateMany({
    _id: chosenID
  }, {
    $set: {
      "name": doorItemName,
      "brand": doorItemBrand,
      "currentAmount": doorItemCurrentAmount,
      "totalAmount": doorItemTotalAmount,
      "location": doorItemStorage,
      "note": doorItemNote
    }
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successful");
    }
  });
  res.redirect("/door");
});


app.get("/kitchen", function(req, res) {
  Kitchen.find({}, function(err, foundItems) {
    res.render("Kitchen", {
      Kitchen: foundItems
    });
  });
});

app.post("/kitchen", function(req, res) {
  const kitchenItemName = req.body.kitchenNamei;
  const kitchenItemBrand = req.body.kitchenBrandi;
  const kitchenItemCurrentAmount = req.body.kitchenCurrentAmounti;
  const kitchenItemTotalAmount = req.body.kitchenTotalAmounti;
  const kitchenItemStorage = req.body.kitchenStoragei;
  const kitchenItemNote = req.body.kitchenNotei;
  const kitchen = new Kitchen({
    name: kitchenItemName,
    brand: kitchenItemBrand,
    currentAmount: kitchenItemCurrentAmount,
    totalAmount: kitchenItemTotalAmount,
    location: kitchenItemStorage,
    note: kitchenItemNote
  })
  kitchen.save();
  res.redirect("/kitchen");
});

app.post("/deleteKitchen", function(req, res) {
  const chosenID = req.body.targetId;
  Kitchen.findByIdAndRemove(chosenID, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successful");
    }
  });
  res.redirect("/Kitchen");
});

app.post("/editKitchen", function(req, res) {
  const chosenID = req.body.targetId;
  const kitchenItemName = req.body.kitchenNameie;
  const kitchenItemBrand = req.body.kitchenBrandie;
  const kitchenItemCurrentAmount = req.body.kitchenCurrentAmountie;
  const kitchenItemTotalAmount = req.body.kitchenTotalAmountie;
  const kitchenItemStorage = req.body.kitchenStorageie;
  const kitchenItemNote = req.body.kitchenNoteie;

  Kitchen.updateMany({
    _id: chosenID
  }, {
    $set: {
      "name": kitchenItemName,
      "brand": kitchenItemBrand,
      "currentAmount": kitchenItemCurrentAmount,
      "totalAmount": kitchenItemTotalAmount,
      "location": kitchenItemStorage,
      "note": kitchenItemNote
    }
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successful");
    }
  });
  res.redirect("/Kitchen");
});

app.get("/Light", function(req, res) {
  Light.find({}, function(err, foundItems) {
    res.render("Light", {
      Light: foundItems
    });
  });
});

app.post("/Light", function(req, res) {
  const lightItemName = req.body.lightNamei;
  const lightItemBrand = req.body.lightBrandi;
  const lightItemCurrentAmount = req.body.lightCurrentAmounti;
  const lightItemTotalAmount = req.body.lightTotalAmounti;
  const lightItemStorage = req.body.lightStoragei;
  const lightItemNote = req.body.lightNotei;
  const light = new Light({
    name: lightItemName,
    brand: lightItemBrand,
    currentAmount: lightItemCurrentAmount,
    totalAmount: lightItemTotalAmount,
    location: lightItemStorage,
    note: lightItemNote
  })
  light.save();
  res.redirect("/Light");
});

app.post("/deleteLight", function(req, res) {
  const chosenID = req.body.targetId;
  Light.findByIdAndRemove(chosenID, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successful");
    }
  });
  res.redirect("/Light");
});

app.post("/editLight", function(req, res) {
  const chosenID = req.body.targetId;
  const lightItemName = req.body.lightNameie;
  const lightItemBrand = req.body.lightBrandie;
  const lightItemCurrentAmount = req.body.lightCurrentAmountie;
  const lightItemTotalAmount = req.body.lightTotalAmountie;
  const lightItemStorage = req.body.lightStorageie;
  const lightItemNote = req.body.lightNoteie;

  Light.updateMany({
    _id: chosenID
  }, {
    $set: {
      "name": lightItemName,
      "brand": lightItemBrand,
      "currentAmount": lightItemCurrentAmount,
      "totalAmount": lightItemTotalAmount,
      "location": lightItemStorage,
      "note": lightItemNote
    }
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successful");
    }
  });
  res.redirect("/Light");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
