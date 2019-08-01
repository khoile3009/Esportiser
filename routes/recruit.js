var express 	= require("express");
var router  	= express.Router();
var Recruit 	= require("../models/recruit.js")
var map			= require("../public/javascript/map.js")
var queryString = require("querystring")

router.get("/recruit", function(req,res){
	var search = {};
	Object.keys(req.query).forEach(function(key){
		if(key != 'page'){
			search[key] = req.query[key]
		}
	});
	Recruit.find(search, function(err, recruits){
		if(err){
			console.log(err);
		}
		else{
			if(req.query.page){
				res.render("recruit/showroom", {stringify:queryString.stringify,maxPage:Math.ceil(recruits.length / map.maxBanner), map: map, search: req.query, recruits:recruits.slice((parseInt(req.query.page) - 1) * map.maxBanner,parseInt(req.query.page) * map.maxBanner)})
			}
			else{
				res.render("recruit/showroom", {stringify:queryString.stringify,maxPage:Math.ceil(recruits.length / map.maxBanner),map: map, search: req.query, recruits:recruits.slice(0,map.maxBanner)});
			}
		}
	})
})

router.post("/recruit", isLoggedIn, function(req,res){
	var user = {id: req.user._id,
		username: req.user.username};
	var number = parseInt(req.body.number);
	var queue = req.body.queue;
	var rank = req.body.rank;
	var position = req.body.position
	var description = req.body.description;
	var exprire_at = new Date(new Date().getTime() + req.body.expire_at * 60 * 1000)
	var newRecruit = {
		user:user,
		number: number,
		description:description,
		queue: queue,
		rank: rank,
		position: position,
		exprire_at: exprire_at
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