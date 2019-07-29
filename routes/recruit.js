var express 	= require("express");
var router  	= express.Router();
var Recruit 	= require("../models/recruit.js")


router.get("/recruit", function(req,res){
	Recruit.find(req.query, function(err, recruits){
		if(err){
			console.log(err);
		}
		else{
			console.log(recruits)
			res.render("recruit/showroom", {search: req.query, recruits:recruits})
		}
	})
})

router.post("/recruit", isLoggedIn, function(req,res){
	console.log(req.body)
	var user = {id: req.user._id,
		username: req.user.username};
	var number = parseInt(req.body.number);
	var queue = req.body.queue;
	var rank = req.body.rank;
	var position = req.body.position
	var description = req.body.description;
	var newRecruit = {
		user:user,
		number: number,
		description:description,
		queue: queue,
		rank: rank,
		position: position
	};
	Recruit.create(newRecruit,function(err,recruit){
		if(err){
			console.log(err);
		}
		else{
			res.redirect('/recruit') 
		}
	})
})

router.get("/recruit/new", isLoggedIn, function(req,res){
	res.render('recruit/new')
})

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect("/login");
}

module.exports = router