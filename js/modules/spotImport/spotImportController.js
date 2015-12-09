(function () {
    'use strict';

    angular
      .module('recycler')
      .controller('sportImportController', ['$scope', 'sportImportFactory', 'usSpinnerService',
        function ($scope, sportImportFactory, usSpinnerService) {
            $scope.newSpots = [];
            $scope.updatedSpots = [];

            sportImportFactory.getSpotsFromMaptive()
              .then(function (result) {
                  usSpinnerService.spin('spinner-1');
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

            $scope.$watch('newSpots.length', function (newData) {
                if (newData) {
                    usSpinnerService.stop('spinner-1');
                }
            });

            $scope.import = function () {
                alert('TODO');
                var spot = $scope.newSpots[0];
                debugger;
                var spotData = $rootScope.el.data('Spot');
                var location = {
                    longitude: spot.ln,
                    latitude: spot.lt
                }
                spotData.create({
                    //'userId': spot.UserID,
                    "Name": spot.t,
                    "Description": spot.Description,
                    "Longitude": spot.ln,
                    "Latitude": spot.lt,
                    "Country": 'Denmark',
                    //"City": spot.City,
                    //"CVR": spot.CVR,
                    "Address": spot.a,
                    "EventDate": spot.EventDate,
                    "Phone": spot.Phone,
                    "SpotType": spot.SpotType,
                    //"State": spot.State,
                    //"Web": spot.Web,
                    "Zip": spot.postalcode,
                    "ClosingTimeSat": spot.ClosingTimeSat,
                    "ClosingTimeSun": spot.ClosingTimeSun,
                    "ClosingTimeWeekdays": spot.ClosingTimeWeekdays,
                    "OpeningHoursSaturdayFrom": spot.OpeningHoursSaturdayFrom,
                    "OpeningHoursSaturdayTo": spot.OpeningHoursSaturdayTo,
                    "OpeningHoursSundayFrom": spot.OpeningHoursSundayFrom,
                    "OpeningHoursSundayTo": spot.OpeningHoursSundayTo,
                    "OpeningHoursWeekdaysFrom": spot.OpeningHoursWeekdaysFrom,
                    "OpeningHoursWeekdaysTo": spot.OpeningHoursWeekdaysTo,
                    "OpeningTimeSat": spot.OpeningTimeSat,
                    "OpeningTimeSun": spot.OpeningTimeSun,
                    "OpeningTimeWeekdays": spot.OpeningTimeWeekdays,
                    //"Image": res.result.Uri,
                    "Location": location

                },
                    function (data) {
                        debugger;

                    },
                    function (error) {
                        console.log(error);
                    });
            }
        }])
})();