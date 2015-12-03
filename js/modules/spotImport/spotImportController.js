(function () {
  'use strict';

  angular
    .module('recycler')
    .controller('sportImportController', ['$scope', 'sportImportFactory',
      function ($scope, sportImportFactory) {

        sportImportFactory.getSpotsFromDb()
          .then(function (result) {
            $scope.telerikSpots = result;
          });

        sportImportFactory.getSpotsFromMaptive()
          .then(function(result) {
            $scope.maptiveSpots = result;
          })
      }])
})();