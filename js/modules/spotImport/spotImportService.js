(function () {
  'use strict';

  angular
    .module('recycler')
    .factory('sportImportFactory', ['$http',
      function ($http) {
        return {
          getSpotFromDb: function() {
            return $http.get('')
          }
        }
      }])
})();