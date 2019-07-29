// Dependencies
var express			= require("express"),
	app				= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	methodOverride  = require("method-override"),
	Netcafe 		= require("./models/netcafe"),
	passport 		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	Comment 		= require("./models/comment"),
	User 			= require("./models/user");
// Import Routing
var	indexRoutes		= require("./routes/index"),
	netcafeRoutes 	= require("./routes/netcafe");
	recruitRoutes 	= require("./routes/recruit")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/assets"))
app.use(methodOverride("_method"))

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/esportiser");


// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "I am Ironman",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
})

//Routing use
app.use(indexRoutes);
app.use(netcafeRoutes);
app.use(recruitRoutes);

//Listen on port 3000
app.listen(3000,function(){
	console.log("Check localhost:3000");
});


