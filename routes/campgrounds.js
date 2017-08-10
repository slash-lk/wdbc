var express = require("express"),
Campground = require("../models/campground"),
Middleware = require("../middleware");   //folder name will automatically point to index.js

var router = express.Router();


//INDEX - show all
//router.get("/campgrounds", function(req, res) {  **changed due to app.use("/campgrounds", campgroundRoutes); in app.js
router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    })
});



//CREATE - add new
//router.post("/campgrounds", function(req, res) {
router.post("/", Middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = {id: req.user._id, username: req.user.username};
    
    var newCampground = {name: name, price: price, image: image, description: description, author: author};
    
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        }
        else {
            req.flash("success", "Campground added.");
            res.redirect("/campgrounds");
        }
    })
});


//NEW - show form to enter new
//router.get("/campgrounds/new", function(req, res) {
router.get("/new", Middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});


//SHOW - show details of one record
//router.get("/campgrounds/:id", function(req, res) {
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        }
        else {
            //console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT ROUTE
router.get("/:id/edit", Middleware.checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            res.render("campgrounds/edit", {campground: foundCampground});
        });
});

//UPDATE ROUTE
router.put("/:id", Middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//DESTROY ROUTE
router.delete("/:id", Middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds");
        }
    })
});


module.exports = router;