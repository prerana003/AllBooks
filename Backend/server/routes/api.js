const express=require('express');
const router=express.Router();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const loginModel = require('../models/loginSchema');

//connecting to database
const db = "mongodb+srv://preranahazra98:<Mini2003>@cluster0.fhhyl.mongodb.net/<OnlineBookstore>?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(db, {useNewUrlParser : true, useUnifiedTopology: true}, function(error){
    if (error)
        console.log("Error!" + error);
});


var len = 0;

//signup api
router.post('/signup',function(req,res)
{
    console.log('New signup process');
    var newSignup = new loginModel();

    newSignup.name = req.body.uname;
    newSignup.emailID = req.body.email;
    newSignup.password = req.body.psw; 
    newSignup.dob = req.body.dob; 
    //newSignup.gender = req.body.gender; 

    var query = {"emailID": req.body.email};
    
    loginModel.find(query,function(err,data)
    {
        if (err)
        {
            console.log(err);
            res.status(500);
            res.send('Error in finding record!');
        }    
        else
        {
            //console.log(data);
            len = data.length;
            if (len > 0)

                res.send("You have already signed up.");
            else
            {
                newSignup.save(function(error,SignupData){
                    if (error)
                    {
                        console.log(error);
                        res.status(500);
                        res.send('Error in saving signup details');          
                    }  
                    else
                    {
                        res.status(200);
                        //res.json(data);
                        res.send('Signup successful!');
                    }
                    mongoose.connection.close();
                });                                 
            } 
        }
    });    
});

module.exports=router;
