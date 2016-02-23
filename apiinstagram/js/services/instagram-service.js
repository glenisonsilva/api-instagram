(function () {
var Authentication = angular.module('app');

Authentication.factory('instagramService',
    ['$cookieStore', '$rootScope',
        function ($cookieStore, $rootScope) {

            var service = {};

            var providerService = {};

            service.start = function (provider) { 

                if(provider) {

                    providerService = provider;

                    service.authLink = providerService.getAuthLink();

                }

                $rootScope.globals = $cookieStore.get('globals') || {};

                if (service.isLoggedIn()) {

                    providerService.setAuth(service.getCurrentUser().access_token);

                        service.checkCredentials(function(result){

                            if(!result) {

                                service.ClearCredentials();

                            }

                        });
      
                } else {

                    providerService.setAuth();

                }

            };

            service.isLoggedIn = function () {

                return $rootScope.globals.currentUser;

            };

            service.getCurrentUser = function () {

                return $rootScope.globals.currentUser;

            };

            service.getAuthLink = function () {
                return service.authLink;
            };

            service.setAuth = function(accessToken){

                providerService.setAuth(accessToken);

                $rootScope.access_token = accessToken;

            };

            service.getUserSelf = function (callback) {

                providerService.getUserSelf(function (response) {

                    service.SetCredentials(response.data);

                    if(callback) {
                        callback(response);
                    }

                });

            };

            service.getFollowedBy = function (url, userId, callback) {
                
                providerService.getFollowedBy(url, userId, function (response) {
                    if(callback) {
                        callback(response);
                    }

                });

            };

            service.SetCredentials = function (user) {

                $rootScope.globals = {
                    currentUser: {
                        access_token : $rootScope.access_token || $cookieStore.get('globals').currentUser.access_token,
                        username: user.username,
                        userId: user.id,
                        profile_picture: user.profile_picture,
                        full_name: user.full_name,
                        bio: user.bio,
                        website: user.website,
                        counts: user.counts
                    }
                };

                $cookieStore.put('globals', $rootScope.globals);
            };

            service.checkCredentials = function(callback){

                providerService.checkCredentials(function(response){

                    callback(response);

                });

            };

            service.ClearCredentials = function () {

                $rootScope.globals = {};
                $cookieStore.remove('globals');
                providerService.setAuth();

            };
            
            return service;

        }]);
 }());