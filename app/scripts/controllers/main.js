'use strict';

angular.module('smart2App')
  .controller('MainCtrl', function ($scope) {
  })
  .controller('MostRecentSubmissionsCtrl', function ($scope, mostRecentSubmissions) {
    $scope.rows = [];
    $scope.loading = true;
    $scope.error = false;

    mostRecentSubmissions.byTeam()
      .then(function (response) {
        $scope.rows = response.rows;
      })
      .catch(function (error) {
        $scope.error = true;
        console.log(error);
      })
      .finally(function () {
        $scope.loading = false;
      });
  })
  .controller('WorkCompletedCtrl', function ($scope, surveyWorkCompleted) {
    $scope.rows = [];
    $scope.loading = true;
    $scope.error = false;

    surveyWorkCompleted.byTeam()
      .then(function (response) {
        $scope.rows = response.rows;
      })
      .catch(function (error) {
        $scope.error = true;
        console.log(error);
      })
      .finally(function () {
        $scope.loading = false;
      });
  })
  .controller('DistributionOfAgeCtrl', function ($scope, distributionOfAge) {
    $scope.children = [];
    $scope.members = [];
    $scope.loading = true;
    $scope.error = false;

    distributionOfAge.byTeam()
      .then(function (response) {
        var children = [];
        var members = [];

        response.rows.forEach(function (row) {
          var target = (row.key[0] === 'children') ? children : members;
          target[row.key[1]] = [row.key[1], row.value];
        });

        [children, members].forEach(function (data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i] === undefined)
              data[i] = [i, 0];
          }
        });

        $scope.children = [
          { values: children }
        ];

        $scope.members = [
          { values: members }
        ];
      })
      .catch(function (error) {
        $scope.error = true;
        console.log(error);
      })
      .finally(function () {
        $scope.loading = false;
      });
  });
