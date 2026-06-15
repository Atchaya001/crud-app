const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const methodOverride = require("method-override");

const Student = require("./models/Student");

const app = express();

/* MongoDB Connection */

mongoose.connect(
"mongodb://127.0.0.1:27017/studentdb"
)

.then(()=>{
    console.log("MongoDB Connected");
});

/* EJS Setup */

app.set("view engine","ejs");

/* Middleware */

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(methodOverride("_method"));

/* READ */

app.get("/", async(req,res)=>{

    const students = await Student.find();

    res.render("index",{students});

});

/* CREATE */

app.post("/add", async(req,res)=>{

    await Student.create({

        name:req.body.name,
        dept:req.body.dept

    });

    res.redirect("/");

});

/* EDIT PAGE */

app.get("/edit/:id", async(req,res)=>{

    const student =
    await Student.findById(req.params.id);

    res.render("edit",{student});

});

/* UPDATE */

app.put("/update/:id", async(req,res)=>{

    await Student.findByIdAndUpdate(

        req.params.id,

        {
            name:req.body.name,
            dept:req.body.dept
        }

    );

    res.redirect("/");

});

/* DELETE */

app.delete("/delete/:id", async(req,res)=>{

    await Student.findByIdAndDelete(
        req.params.id
    );

    res.redirect("/");

});

/* Server */

app.listen(5000,()=>{

    console.log("Server Running");

});