(function() {
	'use-strict'

	function authenticationController($scope, $stateParams, instagramService, instagramApi, $location) {
	    $scope.$on('$viewContentLoaded', function () {

	    	//parametro da url
	        $scope.accessToken = $stateParams.accessToken;

	        instagramService.setAuth($scope.accessToken);

	        instagramService.getUserSelf(function (response) {	        	

	        $location.path("/#/home");

	        });

	    });
	}

	angular.module('app').controller('authenticationController', authenticationController);

}());