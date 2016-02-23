(function(){
	'use-strict';

	angular.module('app.controllers', []);
	angular.module('app.services', []);

	var app = angular.module('app', ['infinite-scroll', 
		 'ui.router', 'ngCookies' ,
	 'app.controllers', 'app.services']);

    app.constant('CLIENT_ID', 'd804b95650b0496a8c37d7a4ac8e9787');
    app.constant('CLIENT_SECRET', '17ca21db2e034445bb719ee6cf210e7d');
    app.constant('REDIRECT_URI', 'http://local.apiinstagram.com.br/callback.html');

    app.constant('instagramApiConfig', {
        apiUrl: 'https://api.instagram.com/v1/',
        clientId: 'd804b95650b0496a8c37d7a4ac8e9787',
        callback: 'http://local.apiinstagram.com.br/callback.html'
    }
);

    angular.module('app').run(["$rootScope", 'instagramService', 'instagramApi', 'instagramApiConfig', '$state', function ($rootScope, instagramService, instagramApi, instagramApiConfig, $state) {

    instagramApi.setCredentials(instagramApiConfig);

    instagramService.start(instagramApi);

    $rootScope.$state = $state;

    $rootScope.errorCodes = instagramApi.errorCodes;

}]);
    
}());