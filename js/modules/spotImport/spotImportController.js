(function () {
  'use strict';

  angular
    .module('recycler')
    .controller('sportImportController', ['$scope', 'sportImportFactory',
      function ($scope, sportImportFactory) {
        $scope.newSpots = [];
        $scope.updatedSpots = [];

        sportImportFactory.getSpotsFromMaptive()
          .then(function (result) {
            $scope.maptiveSpots = result;

            sportImportFactory.getSpotsFromDb()
              .then(function (result) {
                $scope.telerikSpots = result;

                _.forEach($scope.telerikSpots.result, function (item, index) {
                  item.Latitude = parseFloat(item.Latitude, 10);
                  item.Longitude = parseFloat(item.Longitude, 10);
                });

                var sortedTelerikSpots = _.sortBy($scope.telerikSpots.result, 'Latitude');
                var sortedMaptiveSpots = _.sortBy($scope.maptiveSpots.markers, 'lt');

                _.forEach(sortedTelerikSpots, (function (telerikSpot) {
                  _.forEach(sortedMaptiveSpots, function (maptiveSpot, index) {
                    if (telerikSpot.Latitude == maptiveSpot.lt) {
                      if (telerikSpot.Longitude == maptiveSpot.lg) {
                        sortedMaptiveSpots.splice(index, 1);
                        $scope.updatedSpots.push(maptiveSpot);
                      }
                    } else {
                      $scope.newSpots.push(maptiveSpot);
                      $scope.newSpots = _.uniq($scope.newSpots);
                    }
                  })
                }))
              });
          });
      }])
})();