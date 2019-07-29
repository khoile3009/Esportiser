var mongoose = require("mongoose");

var netcafeSchema = new mongoose.Schema({
	name: String,
	image: String, // Code of image in database
	address: String,
	description: String,
	owner: {
    	id:{
			type: mongoose.Schema.Types.ObjectId,
         	ref: "User"
		},
		username: String
	},
	comments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
     }
    ]
})


module.exports = mongoose.model("Netcafe", netcafeSchema)