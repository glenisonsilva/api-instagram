(function() {
	'use-strict';

	function loginController($scope, $rootScope, instagramService, $http) {
		
    	$rootScope.authLink = instagramService.getAuthLink();
	}

	angular.module('app.controllers', []).controller('loginController', loginController);

}());