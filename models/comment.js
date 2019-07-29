var mongoose = require("mongoose");
 
var commentSchema = new mongoose.Schema({
    text: String,
    author: {
    	id: {
    		type: mongoose.Schema.Types.ObjectId,
    		ref: "User"
    	},
    	username: String
    },
    // On a scale of 1-5
    rating: {
    	hardware: Number,
    	staffs: Number,
    	service: Number
    }
});
  
module.exports = mongoose.model("Comment", commentSchema);