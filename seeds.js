var mongoose= require("mongoose");
var Campground= require("./models/campground");
var Comment= require("./models/comment");

var data= [
    {
        name: "Cloud's Rest", 
        image:"https://lastingadventures.com/wp-content/uploads/2013/11/Clouds-Rest-Spine-Hiking-Yosemite.jpg",
        description: "Lorem ipsum dolor sit amet, vix in persius splendide. Ut usu tollit pertinax, te per rebum minim postulant. Numquam sensibus mnesarchum has ut. Has errem integre facilisi eu, mea ad probo solum, atqui repudiare vix et. Alii tibique adipisci pro cu, mei porro oratio quaerendum ea, ius no modus legimus"
    },
    {
        name: "Desert Mesa",
        image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/red-rock-mesa-and-desert-landscape-rich-reid.jpg",
        description: "Lorem ipsum dolor sit amet, vix in persius splendide. Ut usu tollit pertinax, te per rebum minim postulant. Numquam sensibus mnesarchum has ut. Has errem integre facilisi eu, mea ad probo solum, atqui repudiare vix et. Alii tibique adipisci pro cu, mei porro oratio quaerendum ea, ius no modus legimus."
    },
    {
        name: "Canyon Floor",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTISqpS3hiOlmJSNC7SOY6wQzu3n_LqyHBTMYMoiPOxAUc7MQn-dg",
        description: "Lorem ipsum dolor sit amet, vix in persius splendide. Ut usu tollit pertinax, te per rebum minim postulant. Numquam sensibus mnesarchum has ut. Has errem integre facilisi eu, mea ad probo solum, atqui repudiare vix et. Alii tibique adipisci pro cu, mei porro oratio quaerendum ea, ius no modus legimus."
    }
   ]

function seedDB(){
    Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("removed campgrounds");
    }
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            }
            else{
                console.log("added a campground");
                Comment.create(
                    {
                        text: "This place is great,  but I wish there was Internet",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        }
                        else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment");
                        }
                    });
            }
        });
    });
});
    
}

module.exports=seedDB;