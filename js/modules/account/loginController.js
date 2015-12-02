(function () {
  'use strict';

  angular
    .module('recycler')
    .controller('loginController', ['accountFactory', '$scope', '$state',
      function (accountFactory, $scope, $state) {
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
            $state.go('/');
          } else {
            console.log('login fail')
          }
        }
      }])
})();