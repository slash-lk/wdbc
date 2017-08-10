var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
var data = [
        {
            name: "Seaside",
            image: "https://farm8.staticflickr.com/7168/6670258309_2e52bdbc6c.jpg",
            description: "Phasellus tristique efficitur sapien, at gravida lorem imperdiet at. Curabitur id dignissim lectus. In mattis purus eu magna ultricies consequat. Cras tincidunt, dolor in faucibus maximus, ipsum elit lacinia purus, vel tincidunt velit dolor at magna. Aliquam aliquet, justo ut ultrices imperdiet, justo sem hendrerit nisl, ac commodo ligula sapien vel lorem. Morbi at erat venenatis, facilisis nisi non, volutpat neque. Quisque et massa efficitur, vehicula arcu a, cursus orci. Maecenas libero quam, lacinia ut est sit amet, ornare vestibulum lectus. Praesent placerat massa sit amet massa tempus pretium."
        },
        {
            name: "Riverside",
            image: "https://farm4.staticflickr.com/3805/9667057875_90f0a0d00a.jpg",
            description: "Maecenas sit amet libero malesuada, tristique eros in, ultrices risus. Fusce pharetra ornare tortor eu ornare. Pellentesque in diam eu turpis tempor viverra. Cras dictum, nibh id porta maximus, quam metus tempor augue, sed condimentum dui quam in tortor. Fusce faucibus laoreet ex et tincidunt. Quisque accumsan mauris ac congue condimentum. Pellentesque mollis finibus quam, id commodo dui rhoncus in."
        },
        {
            name: "Marshland",
            image: "https://farm4.staticflickr.com/3211/3062207412_03acc28b80.jpg",
            description: "Sed euismod ornare erat, sollicitudin rutrum quam fringilla id. Vestibulum nec euismod urna. Fusce non dolor non lorem egestas molestie et non ipsum. Vestibulum euismod ut elit nec cursus. Fusce commodo sapien nec lorem varius sagittis. Cras porta ex vel nibh viverra sodales. Proin sit amet orci lorem. Ut et sapien sagittis, faucibus metus vel, lacinia lorem. Mauris consequat purus vitae enim mollis congue. Cras facilisis commodo justo, a consectetur arcu tempor id."
        }
    ]
    
function seedDB() {    
    Campground.remove({}, function(err) {
        /*if (err) {
            console.log(err);
        }
        else {
            console.log("removed all campgrounds!");
            
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("added a campground!");
                        
                        Comment.create(
                            {
                                text: "Sweet child O' Mine...",
                                author: "Axle Rose"
                            }, function(err, comment) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("added a new comment!");
                                }
                            }
                            )
                    }
                });
            });
        }*/
    });
    
    
}

module.exports = seedDB;