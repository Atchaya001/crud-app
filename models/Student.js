const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({

    name:String,
    dept:String

});

module.exports =
mongoose.model("Student",StudentSchema);