(function () {
  'use strict';

  angular
    .module('recycler', ['ui.router', 'angularSpinner'])
    .constant('constants', {
      telerikAppId: 'yPCpguY5pk7Zy5rc',
      telerikLoginData: {
        username: 'bjarke@bsrweb.dk',
        password: 'Rec0089'
      }
    })
    .run(['$rootScope', 'constants',
      function($rootScope, constants) {
        $rootScope.currentUser = {
          isAuth: false
        };

        // Config Telerik SDK
        $rootScope.el = new Everlive({
          appId: constants.telerikAppId,
          scheme: 'http'
        });
    }])
    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
          .state('main', {
            url: '/',
            templateUrl: 'js/modules/layout/main.html',
            resolve: {
              //authenticated: function($q, $location, $rootScope) {
              //  var deferred = $q.defer();
              //
              //  if($rootScope.currentUser.isAuth) {
              //    deferred.resolve(true);
              //  } else {
              //    $location.url('/login');
              //    deferred.resolve(false);
              //  }
              //
              //  return deferred.promise;
              //}
            }
          })
          .state('login', {
            url: '/login',
            templateUrl: 'js/modules/account/login.html',
            controller: 'loginController'
          })
          .state('main.dashboard', {
            url: 'dashboard',
            templateUrl: 'js/modules/dashboard/dashboard.html'
          })
          .state('main.spotImport', {
            url: 'spotImport',
            templateUrl: 'js/modules/spotImport/spotImport.html',
            controller: 'sportImportController'
          })
      }])
})();