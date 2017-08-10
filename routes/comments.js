var express = require("express"),
Campground = require("../models/campground"),
Comment = require("../models/comment"),
Middleware = require("../middleware");   //folder name will automatically point to index.js

var router = express.Router({mergeParams: true});      //mergeParams: true makes it possible to access req.params

//router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
router.get("/new", Middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", {campground: campground});
        }
    });
})


//router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
router.post("/", Middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                }
                else {
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment added.");
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    });
});


router.get("/:comment_id/edit", Middleware.checkCommentsOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back");
        }
        else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    })
});


router.put("/:comment_id", Middleware.checkCommentsOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});


//DESTROY ROUTE
router.delete("/:comment_id", Middleware.checkCommentsOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});


module.exports = router;