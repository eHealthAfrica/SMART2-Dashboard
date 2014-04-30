'use strict';

angular.module('smart2App')
  .controller('MainCtrl', function ($scope) {
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
  });
