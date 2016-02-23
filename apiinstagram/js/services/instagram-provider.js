(function () {

    angular.module('app.services', []).factory('instagramApi', function ($http) {

        var instagram = {}, clientId, callback, apiUrl, endPoint, callbackString = "&callback=JSON_CALLBACK", auth = "", _access_token;

        instagram.setCredentials = function (instagramApiConfig) {

            apiUrl = instagramApiConfig.apiUrl;
            clientId = instagramApiConfig.clientId;
            callback = instagramApiConfig.callback;

        };

        instagram.setAuth = function (access_token) {
            if (access_token) {
                _access_token = access_token;
                auth = "access_token=" + access_token;
            } else {
                auth = "client_id=" + clientId;
            }
        };

        instagram.getAuth = function () {
            return auth;
        };

        instagram.getAuthLink = function () {
            return "https://instagram.com/oauth/authorize/?client_id=" + clientId + "&redirect_uri=" + callback + "&response_type=token&scope=likes+relationships+follower_list";
        };

        instagram.getUser = function (userId, callback) {

            endPoint = apiUrl + "users/" + userId + "/?" + instagram.getAuth() + callbackString;

            $http.jsonp(endPoint).success(function (response) {
                callback(response);
            });

        };

        instagram.getUserSelf = function (callback) {
            endPoint = apiUrl + "users/self/?"+instagram.getAuth() + callbackString;
            $http.jsonp(endPoint).success(function (response) {
                callback(response);
            });

        };

        instagram.checkCredentials = function(callback){

            instagram.getUserSelf(function(response){

                if(response.meta.code == 400) {

                    callback(false);

                }else{

                    callback(true);

                }

            });

        };

        instagram.getFollowedBy = function(nextIterator, userId, callback)
        {

            if(userId == null) 
                {userId = "self";}

            if(nextIterator != null)
                endPoint = nextIterator + '&callback=JSON_CALLBACK';
            else
                endPoint = apiUrl + "users/" + userId + "/followed-by?" + instagram.getAuth() + callbackString;               

            $http.jsonp(endPoint).success(function (response) {
                callback(response);
            });

        };

        return instagram;

    });
 }());