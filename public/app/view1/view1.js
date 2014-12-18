angular.module('myAppRename.viewCategories', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/viewCategories', {
                templateUrl: 'app/viewCategories/Categories.html',
                controller: 'View3Ctrl'
            })
            .when('/:wiki.indexOf(wikiPage)', {
                templateUrl: 'app/viewCategories/wikiDetails.html',
                controller: 'wikiPageDetailsCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }])

    .factory('wiki', function($http) {
        function getData(callback){
            $http({
                method: 'GET',
                url: 'api/wiki',
                cache: true
            }).success(callback);
        }
        return {
            list: getData,
            find: function(title, callback){
                getData(function(data) {
                    var page = data.filter(function(entry) {
                        return entry.title === title;
                    })[0];
                    callback(page);
                });
            }
        }
    })

    .controller('View3Ctrl', function ($scope, wiki) {
        wiki.list(function(wiki) {
            $scope.wiki = wiki;
        });
    })

    .controller('wikiPageDetailsCtrl', function($scope, $routeParams, wiki) {
        wiki.find($routeParams.pageTitle, function(page) {
            $scope.page = page;
        });
    })

    .filter('encodeURI', function(){
        return window.encodeURI;
    });