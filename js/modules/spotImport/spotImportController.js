(function () {
  'use strict';

  angular
    .module('recycler')
    .controller('sportImportController', ['$scope', 'sportImportFactory',
      function ($scope, sportImportFactory) {
        $scope.title = 'title';
        sportImportFactory.getSpotFromDb()
          .then(function (result) {
            $scope.telerikSpots = result;
          });
      }])
})();