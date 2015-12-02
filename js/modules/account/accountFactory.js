(function () {
  'use strict';

  angular
    .module('recycler')
    .factory('accountFactory', ['$http', '$q',
      function ($http ,$q) {
        return {
          login: function (loginData) {
            var deferred = $q.defer();

            $http.get('js/modules/account/loginData.json')
              .success(function (result) {
                if ((loginData.username === result.username) && (loginData.password === result.password)) {
                  deferred.resolve('login success');
                } else {
                  deferred.reject('login fail');
                }

                return deferred.promise;
              })
              .error(function() {
                console.log('error getting file');
              })
          }
        }
      }])
})();