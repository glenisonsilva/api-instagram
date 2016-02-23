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
	}
	
}());