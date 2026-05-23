const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb+srv://<softwareweb248_db_user>:<RgULyQ6Eg6T9HD3t>@create-deployment.bmcdw3l.mongodb.net/?appName=Create-Deployment")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const EntrySchema = new mongoose.Schema({

    date:String,
    description:String,
    rate:Number,
    qty:Number,
    amount:Number,
    company:String,
    project:String,
    partyName:String,
    partyNumber:String,
    givenPayment:Number,
    remainingPayment:Number,
    status:String,
    note:String

});

const Entry = mongoose.model("Entry", EntrySchema);

app.get("/getData", async(req,res)=>{

    const data = await Entry.find();

    res.json(data);

});

app.post("/addData", async(req,res)=>{

    const newData = new Entry(req.body);

    await newData.save();

    res.json({message:"Data Saved"});

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{

    console.log("Server Running");

});