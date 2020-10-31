// Budget API
const mongoose = require('mongoose')
const budgetModel = require("./budgetStuffSchema")
let url = 'mongodb://localhost:27017/budget';

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use('/', express.static('public')); // THIS IS CRITICAL 
app.use(express.json()); 



app.get('/hello', (req, res) => {
    res.send("Hello WOrld");
});


app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});


app.get('/budget', (req, res) => 
{
    // connect to mongoose database w/ URL, retrieve all the values w/find, then psot it?
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
    {
        console.log("Connected to the database")
        
        // Find Operation - List all entries
        budgetModel.find({})
                .then((data)=> 
                {
                    console.log(data)
                    res.json(data);
                    mongoose.connection.close()
                })
                .catch((connectionError) => 
                {
                    console.log(connectionError);
                })      
    })
    .catch((err) => 
    {
        console.log(err);
    })
});


app.post("/budget", (req, res) =>
{
    console.log("Post stuff")
    // Connect to database, create new model var (title, color, id??), insert the new  model into schema
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
    {
        // create new model var to insert
        var newBudget = new budgetModel(
        {
            id: req.body.id,
            title: req.body.title,
            budget: req.body.budget,
            color: req.body.color
        });
        
        // Insert it
        budgetModel.insertMany(newBudget)
                .then((data)=> 
                {
                    console.log(data)
                    res.json(data);
                    mongoose.connection.close()
                })
                .catch((connectionError) => 
                {
                    console.log(connectionError);
                    //mongoose.connection.close()
                })      
    })
    .catch((err) => 
    {
        console.log(err);
    })

});

