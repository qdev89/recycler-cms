(function () {
  'use strict';

  angular
    .module('recycler', ['ui.router'])
    .run(['$rootScope',
      function($rootScope) {
        $rootScope.currentUser = {
          isAuth: false
        }
    }])
    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
          .state('main', {
            url: '/',
            templateUrl: 'js/modules/layout/main.html',
            resolve: {
              authenticated: function($q, $location, $rootScope) {
                var deferred = $q.defer();

                if($rootScope.currentUser.isAuth) {
                  deferred.resolve(true);
                } else {
                  $location.url('/login');
                  deferred.resolve(false);
                }

                return deferred.promise;
              }
            }
          })
          .state('login', {
            url: '/login',
            templateUrl: 'js/modules/account/login.html',
            controller: 'loginController'
          })
          .state('main.dashboard', {
            url: '/dashboard',
            templateUrl: 'js/modules/dashboard/dashboard.html'
          })
          .state('main.spotimport', {
            url: '/sportimport',
            templateUrl: 'js/modules/sportimport/sportimport.html',
            controller: 'sportImportController'
          })
      }])
})();