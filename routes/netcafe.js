var express 	= require("express");
var router  	= express.Router();
var Netcafe 	= require("../models/netcafe.js")

router.get("/netcafe", function(req,res){
	Netcafe.find({}, function(err, netcafes){
		if(err){
			console.log(err);
		}
		else{
			res.render("netcafe/showroom", {netcafes:netcafes})
		}
	})
	
})

router.post("/netcafe", isLoggedIn, function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var owner = {id: req.user._id,
		username: req.user.username};
	var newCafe = {name:name, image: image, description: description, owner: owner};
	Netcafe.create(newCafe,function(err,newCafe){
		if(err){
			console.log(err);
		}
		else {
			res.redirect("/netcafe");
		}
	})
});

router.get("/netcafe/new", isLoggedIn, function(req,res){
	res.render('netcafe/new')
})


function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect("/login");
}


module.exports = router