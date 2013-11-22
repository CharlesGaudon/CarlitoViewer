document.addEventListener('deviceready', function() {
	//code au lancement de l'appli
}, false);

var app = angular.module('app', ['ui.bootstrap','hmTouchEvents']);


app.config(function($routeProvider) {
	$routeProvider
		.when("/home", {templateUrl:"partials/home.html"})
		.when("/about",{templateUrl:"partials/about.html"})
		.otherwise({redirectTo:"/home"})
})

app.directive('ngThumb', function(){
    return function(scope, element, attrs){
        var url = attrs.ngThumb;
        //console.dir(attrs);
        element.css({
            "background-image": "url('" + url +"')",
            "background-size" : "auto",
            "background-repeat":"no-repeat",
            "background-position": "center center"
        });
    };
});

app.directive('ngImgload', function () {       
    return {
        link: function(scope, element, attrs) {   

        	//element.css("transform","none");
        	//scope.scale_transform="none";
            element.bind("load" , function(e){ 

                // success, "onload" catched
                // now we can do specific stuff:
                scope.loader=false;
                scope.$apply();
            });

        }
    }
});


function removePrefix(chaine) {
	if(chaine.indexOf("_-_-_-")>-1) {
		return chaine.substring(chaine.lastIndexOf("_-_-_-")+6,chaine.length);
	} else {
		return chaine;
	}
}

if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

/*
if (document.addEventListener) {
  document.addEventListener('touchmove', function(e){
    e.preventDefault();
  });
}
*/
/*$(function(){
var imageElems = $('#img_content_id');

imageElems.hammer({prevent_default:true})
    .on("pinchin", function (evt)
    {
        alert('zoom out');
        //more stuff
    }).on("pinchout", function (evt)
    {
        alert('zoom in');
        //more stuff
    }); 

});*/
