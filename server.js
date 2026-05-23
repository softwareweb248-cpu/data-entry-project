const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb+srv://softwareweb248_db_user:RgULyQ6Eg6T9HD3t@create-deployment.bmcdw3l.mongodb.net/dataEntryDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

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


// GET DATA

app.get("/getData", async(req,res)=>{

    const data = await Entry.find().sort({_id:-1});

    res.json(data);

});


// SAVE DATA

app.post("/addData", async(req,res)=>{

    try{

        const newData = new Entry(req.body);

        await newData.save();

        res.json({
            success:true,
            message:"Data Saved"
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{

    console.log(`Server Running On Port ${PORT}`);

});