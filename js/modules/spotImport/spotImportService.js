(function () {
  'use strict';

  angular
    .module('recycler')
    .factory('sportImportFactory', ['$http', '$rootScope', 'constants', '$q',
      function ($http, $rootScope, constants, $q) {
        var el = $rootScope.el;

        function telerikLogin() {
          el.authentication.login(
            constants.telerikLoginData.username,
            constants.telerikLoginData.password,
            function (data) {
              console.info('Telerik login succeeded');
              $rootScope.telerikLoginData = data.result;
            },
            function (error) {
              console.error('Telerik login failed.', error);
            });
        }

        telerikLogin();

        return {
          getSpotFromDb: function () {
            var spots = el.data('Spot'),
              deferred = $q.defer();

            spots.get(null, function (data) {
              console.log('Spot data: ', data);
              deferred.resolve(data);
            }, function (error) {
              deferred.reject(error);
            });

            return deferred.promise;
          }
        }
      }])
})();