(function () {
    'use strict';

    angular
        .module('recycler', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise('/');
                $stateProvider
                    .state('/', {
                        url: "/",
                        templateUrl: "js/modules/dashboard/dashboard.html"
                    })
            }])
})();