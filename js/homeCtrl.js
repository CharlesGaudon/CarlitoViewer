
function homeCtrl($scope, $http) {
	$scope.galleryUrl="http://devandroid.charles-gaudon.com/index.php";
	//$scope.galleryUrl="http://matthieu.charles-gaudon.com/index.php";

	$scope.panel = 0;
	$scope.nocontent=true;
	$scope.galleryUrlSansPhp="";
	$scope.imgToDisplay="";
	$scope.current_repertoire="";
	$scope.root_folder=true;

	$scope.last_scale=1;
	$scope.transform_origin="top 0 left 0";
	$scope.scale_transform="none";


	$scope.display_gallery=function(repertoire) {
		//alert(repertoire)
		var url=$scope.galleryUrl+"?android=true";

		if($scope.galleryUrl.toUpperCase().endsWith("PHP")) {
			//alert("ya php:"+$scope.galleryUrl);
			$scope.galleryUrlSansPhp=$scope.galleryUrl.substring(0, $scope.galleryUrl.lastIndexOf("/"))+"/";
			//alert("sans php:"+$scope.galleryUrlSansPhp)
		} else {
			//alert("yapa php:"+$scope.galleryUrl);
			$scope.galleryUrlSansPhp=$scope.galleryUrl+"/";
		} 

		if(repertoire!=null) {
			url+="&repertoire_android="+repertoire;
			$scope.current_repertoire=repertoire;
			$scope.root_folder=false;
		} else {
			$scope.root_folder=true;
		}

		$scope.loader=true;
		$http.get(url).success(httpSuccess).error(function() {$scope.loader=false;alert("Erreur d'accès");});

	}

	$scope.display_gallery_up = function() {
		$scope.display_gallery($scope.current_repertoire.substring(0,$scope.current_repertoire.substring(0,$scope.current_repertoire.length-1).lastIndexOf("/")+1));
	}

	httpSuccess = function(response) {
		$scope.panel  = 1;
		$scope.nocontent=false;
		$scope.loader=false;
		$scope.gallery = response;

		//alert(angular.fromJson(response));
		//$scope.root_folder=true;
		console.log(angular.fromJson(response));
	}

	$scope.filter_folder = function(obj)
	{
	    if(obj.folder)
	    {
	        return true; // this will be listed in the results
	    }
	    return false; // otherwise it won't be within the results
	};

	$scope.filter_content = function(obj)
	{
	    if(obj.folder)
	    {
	        return false; // this will be listed in the results
	    }
	    return true; // otherwise it won't be within the results
	};

	$scope.getBgImgObj = function(item) {
	   alert(item);
	   return { 'background-image': "url('" + item + "')"  }
	}


	/*$scope.display_ssgallery=function(index) {
		alert(index);
	}*/

	$scope.display_content=function(nomFichier) {
		$("#img_content_id").css("transform","none");
		$scope.last_scale=1;

		$scope.loader=true;
		$scope.imgToDisplay=$scope.galleryUrlSansPhp+nomFichier;//$scope.gallery[index].nomFichier;
		$scope.panel  = 2;
		//window.open($scope.galleryUrlSansPhp+nomFichier,"_system","");
	}

	$scope.removePrefix = removePrefix;


	$scope.style_paz = function() {
		if($scope.last_scale!=1) {
			//return {"transform":"scale3d("+$scope.last_scale+","+$scope.last_scale+", 0)"};
			return {"transform":"scale("+$scope.last_scale+")", "transform-origin":$scope.transform_origin};
			//return {"width":$scope.last_scale*100+"px"};
		} else {
			return {"transform":"none", "transform-origin":"top 0 left 0"};
			//return {"width":"100%"};
		}
	};

	$scope.paz = function(event) {
		var temp=event.gesture.scale;
		
		if(temp>1) {
			temp=((temp-1)/25)+1;
		} else {
			temp=1-((1-temp)/5);
		}
		$scope.transform_origin="top "+event.gesture.pageY+" left "+event.gesture.pageX;
		$scope.last_scale=Math.max(1, Math.min($scope.last_scale*temp, 20));

	}

	$scope.paz_end = function(event) {
		//alert("paz_end:"+$scope.last_scale);
		/*console.log(event);*/
		//alert(event.gesture.center.pageX);



		/*var acc = []
		$.each(event.gesture.center, function(index, value) {
		    acc.push(index + ': ' + value);
		});
		alert(JSON.stringify(acc));*/
		
	}


	$scope.drag_end = function(event) {
		//alert("paz_end:"+$scope.last_scale);
		/*console.log(event);*/
		
	}

	$scope.paz_reset = function(event) {
		//alert("paz_reset");
		//$("#"+event.srcElement.id).css("transform","none");
		$scope.last_scale=1;
		/*console.log(event);
		//$("#"+event.srcElement.id).css("transform","none");*/
	}


}
