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
          getSpotsFromDb: function () {
            var spots = el.data('Spot'),
              deferred = $q.defer();

            spots.get(null, function (data) {
              console.log('Telerik data: ', data);
              deferred.resolve(data);
            }, function (error) {
              deferred.reject(error);
            });

            return deferred.promise;
          },
          getSpotsFromMaptive: function () {
            // CORS error
            //return $http({
            //  method: 'GET',
            //  url: 'http://www.maptive.com/ver3/data.php?operation=get_map_markers&map_id=84877&bounds=53.003421,6.994009,58.592772,13.959341',
            //  withCredentials: true,
            //  headers: {
            //    'Content-Type': 'application/json; charset=utf-8'
            //  }
            //});

            var deferred = $q.defer();

            $http.get('js/modules/spotImport/maptiveSpots.json')
              .success(function (data) {
                console.log('Maptive Spots: ', data);
                deferred.resolve(data);
              })
              .error(function () {
                deferred.reject('get maptive spots fail');
              });

            return deferred.promise;
          },
          getMarkers: function() {

            // CORS error
            //return $http.get('http://www.maptive.com/ver3/data.php?operation=get_map_markers&map_id=84877&bounds=53.003421,6.994009,58.592772,13.959341');

            var deferred = $q.defer();

            $http.get('js/modules/spotImport/maptiveMarkers.json')
              .success(function (data) {
                console.log('Maptive Markers: ', data);
                deferred.resolve(data);
              })
              .error(function () {
                deferred.reject('get maptive markers fail');
              });

            return deferred.promise;
          }
        }
      }])
})();