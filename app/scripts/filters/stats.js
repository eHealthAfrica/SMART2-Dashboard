'use strict';

angular.module('smart2App')
  .filter('stats', function () {
    return function (input) {
      var items = [];
      if (input) {
        ['min', 'mean', 'max', 'n'].forEach(function (prop) {
          items.push(input[prop] || 0);
        });
      }

      return items.join('<br>');
    };
  });