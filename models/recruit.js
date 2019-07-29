var mongoose = require("mongoose");

var recruitSchema = new mongoose.Schema({
	user: {
		id: {
    		type: mongoose.Schema.Types.ObjectId,
    		ref: "User"
    	},
    	username: String
	},
	number: Number,
	description: String,
	queue: String, 
	rank: String,
	position: [String],
	application:{
		user: {
			id: {
	    		type: mongoose.Schema.Types.ObjectId,
	    		ref: "User"
	    	},
	    	username: String
		},
	}
})


module.exports = mongoose.model("Recruit", recruitSchema)