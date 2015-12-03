(function () {
  'use strict';

  angular
    .module('recycler')
    .controller('loginController', ['accountFactory', '$scope', '$state', '$rootScope',
      function (accountFactory, $scope, $state, $rootScope) {
        $scope.loginData = {
          username: '',
          password: ''
        };

        $scope.login = function () {
          //accountFactory.login($scope.loginData)
          //  .then(function(response) {
          //    console.log(response);
          //  });

          // temp
          if($scope.loginData.username == 'bjarke@bsrweb.dk' && $scope.loginData.password == 'Rec0089') {
            $rootScope.currentUser.isAuth = true;
            $state.go('main.dashboard');
          } else {
            console.log('login fail')
          }
        }
      }])
})();