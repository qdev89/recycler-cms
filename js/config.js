angular
    .module('recycler')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('/', {
                url: "/index",
                templateUrl: "index.html"
            })
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "js/dashboard/dashboard.html"
            })
    })
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
    });