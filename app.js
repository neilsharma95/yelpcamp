var express= require("express");
var app= express();
var bodyParser= require("body-parser");
var mongoose= require("mongoose");
var flash= require("connect-flash");
var passport= require("passport");
var LocalStrategy= require("passport-local");
var methodOverride= require("method-override");
var Campground= require("./models/campground");
var Comment= require("./models/comment");
var User= require("./models/user");
var seedDB= require("./seeds");

var campgroundRoutes= require("./routes/campgrounds");
var commentRoutes= require("./routes/comments");
var indexRoutes= require("./routes/index");

app.use(methodOverride("_method"));
app.use(flash());
//seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp1", { useNewUrlParser: true });
//mongoose.connect("mongodb://neil95:getgoing1@ds161804.mlab.com:61804/yelpcamp1",{ useNewUrlParser: true });
//mongodb://localhost:27017/yelp_camp
//process.env.DATABASEURL
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Rusty is the cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //autheticate method is given by passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser= req.user;
   res.locals.error= req.flash("error");
   res.locals.success= req.flash("success");
   next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT,process.env.IP, function(){
   console.log("YelpCamp Server started"); 
});