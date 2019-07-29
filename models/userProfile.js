var mongoose = require("mongoose");

var userProfileSchema = mongoose.Schema(
	user: {
    	id: {
    		type: mongoose.Schema.Types.ObjectId,
    		ref: "User"
    	},
    	username: String
	},
	icon: Number,
	rating: Number,
	numberOfRating: Number,
	accounts: [
		{
			game: String,
			username: String
		}
	]

)

module.exports = mongoose.model("UserProfile", userProfileSchema);