(function () {
  'use strict';

  angular
    .module('recycler', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
          .state('/', {
            url: '/',
            templateUrl: 'js/modules/dashboard/dashboard.html'
          })
          .state('spotimport', {
            url: '/sportimport',
            templateUrl: 'js/modules/sportimport/sportimport.html',
            controller: 'sportImportController'
          })
          .state('login', {
            url: '/login',
            templateUrl: 'js/modules/account/login.html',
            controller: 'loginController'
          })
      }])
})();