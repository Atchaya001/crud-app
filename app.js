const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const methodOverride = require("method-override");

const Student = require("./models/Student");

const app = express();

/* MongoDB Connection */

mongoose.set('strictQuery', false);

mongoose.connect(
"mongodb://atchaya:atchaya123@ac-niwuyjh-shard-00-00.ipnkjaq.mongodb.net:27017,ac-niwuyjh-shard-00-01.ipnkjaq.mongodb.net:27017,ac-niwuyjh-shard-00-02.ipnkjaq.mongodb.net:27017/studentdb?ssl=true&replicaSet=atlas-pelsiz-shard-0&authSource=admin&appName=Cluster0"
)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log(err);
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

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{

    console.log("Server Running");

});