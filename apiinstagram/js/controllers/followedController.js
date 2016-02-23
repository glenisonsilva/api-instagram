(function() {
	'use-strict';


	function followedController ($scope, $http, $rootScope, instagramService)
	{
		$scope.follows = [];
		$scope.busy = true;
		$scope.url = null;

		/*Functions*/
		$scope.nextPage = nextPage;
		$scope.logout = logout;

		$scope.user = $rootScope.globals.currentUser;

		function nextPage() {
		    if ($scope.busy)
		    	return;
		    if($scope.url == undefined)
		    	$scope.busy = false;		      
		    else {
		    	$scope.busy = true;
		    	callGetFollowedBy();
		    }			    

		}

		function logout()
		{
			instagramService.ClearCredentials();
		}

		function callGetFollowedBy()  {
			instagramService.getFollowedBy($scope.url, $scope.user.userId, function (response) {	        	
			    var items = response.data;
				for (var i = 0; i < items.length; i++) {				    
				    if(items[i].full_name == '')
				    	items[i].full_name = items[i].username;
				    $scope.follows.push(items[i]);
				}
				$scope.url = angular.copy(response.pagination.next_url);
				
				$scope.busy = false;

			});
		}

		callGetFollowedBy();
		
	}

	angular.module('app').controller('followedController', followedController);
	

}());

