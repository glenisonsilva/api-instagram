(function() {
	'use-strict';

	angular.module('app').controller('homeController', homeController);

	function homeController ($scope, $stateParams, $location, instagramService) {
		$scope.isLoggedIn = function()
		{
	        if(instagramService.isLoggedIn())
	        {
		    	return true;
		    }
		    else
		    {
		     return false;
		    }
    	};
    	//console.log("indexcontroller");
    	//console.log(instagramService.isLoggedIn()); //retorna dados do login $rootScope.globals.currentUser
	}
	
}());