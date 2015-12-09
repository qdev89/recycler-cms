(function () {
  'use strict';

  angular
    .module('recycler')
    .controller('sportImportController', ['$scope', 'sportImportFactory', 'usSpinnerService',
      function ($scope, sportImportFactory, usSpinnerService) {
        $scope.newSpots = [];
        $scope.updatedSpots = [];
        $scope.markerData = [];

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

                _.forEach(sortedTelerikSpots, function (telerikSpot) {
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
                })
              });
          });

        $scope.$watch('newSpots.length', function (newData) {
          if (newData) {
            usSpinnerService.stop('spinner-1');
          }
        });

        function splitDataFromUrl() {
          sportImportFactory.getMarkers()
            .then(function(result) {
              _.forEach(result.markers, function(marker) {
                var description = marker.d;
                var divs = description.split('</div>');

                _.forEach(divs, function(div) {
                  var day = div.match(new RegExp('\<b\>' + '(.*)' + '\<\/b\>'));
                  var translatedDay = translateDay(day[1]);

                  var time = div.split(';');
                  var translatedTime = translateDate(time[1]);

                  $scope.markerData.push({
                    'day': translatedDay,
                    'time': translatedTime
                  });
                  debugger;
                });
              })

            })
        }

        function translateDay(day) {
          day = day.trim();
          switch(day) {
            case 'Mandag': {
              return 'Monday'
            }
            case 'Tirsdag': {
              return 'Tuesday'
            }
            case 'Onsdag': {
              return 'Wednesday'
            }
            case 'Torsdag': {
              return 'Thursday'
            }
            case 'Fredag': {
              return 'Friday'
            }
            case 'Lørdag': {
              return 'Saturday'
            }
            case 'Søndag': {
              return 'Sunday'
            }
          }
        }

        function translateDate(date) {
          // input: 08.00-16.00
          // output: 8:00 to 4:00 p.m.
          var times = date.split('-');

          if(!_.isEmpty(times)) {
            var firstTimeHour = parseInt(times[0].substring(0, 2));
            var firstTimeMinute = times[0].substr(3, 2);
            var firstTimeIsPM = false;
            if (firstTimeHour > 12) {
              firstTimeIsPM = true;
            }
            var firstTimeResult = firstTimeIsPM ?
            (parseInt(firstTimeHour) - 12) + ':' + firstTimeMinute + 'p.m' :
            parseInt(firstTimeHour) + ':' + firstTimeMinute;

            var secondTimeHour = parseInt(times[1].substring(0, 2));
            var secondTimeMinute = times[1].substr(3, 2);
            var secondTimeIsPM = false;
            if (secondTimeHour > 12) {
              secondTimeIsPM = true;
            }
            var secondTimeResult = secondTimeIsPM ?
            (parseInt(secondTimeHour) - 12) + ':' + secondTimeMinute + ' p.m.' :
            parseInt(secondTimeHour) + ':' + secondTimeMinute;

            return firstTimeResult + ' to ' + secondTimeResult;
          } else if (date.toLowerCase() === 'lukket') {
            return 'Closed';
          }
        }

        splitDataFromUrl();

        $scope.import = function () {
          // http://www.maptive.com/ver3/data.php?operation=get_map_markers&map_id=84877&bounds=53.003421,6.994009,58.592772,13.959341
          alert('TODO');
          var spot = $scope.newSpots[0];
          debugger;
          var spotData = $rootScope.el.data('Spot');
          var location = {
            longitude: spot.ln,
            latitude: spot.lt
          };
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