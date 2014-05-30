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
  })
  .controller('MappingChecksCtrl', function ($scope, surveyWorkCompleted) {
    $scope.loading = false;
    $scope.error = false;

    surveyWorkCompleted.byTeam()
      .then(function (response) {
        var map = new OpenLayers.Map("mappingChecks");
        var osm = new OpenLayers.Layer.OSM();
        map.addLayer(osm);

        var fromProjection = new OpenLayers.Projection("EPSG:4326"); // Transform from WGS 1984
        var toProjection = map.getProjectionObject(); //The map projection (Spherical Mercator)

        var features = [];
        var bounds = new OpenLayers.Bounds();
        response.rows.forEach(function (row) {
          row.value.hh.gpslocs.forEach(function (gpsloc) {
            var point = new OpenLayers.Geometry.Point(gpsloc.lon, gpsloc.lat).transform(fromProjection, toProjection);
            var feature = new OpenLayers.Feature.Vector(point, {team: row.key});

            features.push(feature);
            bounds.extend(point);
          });
        });

        var styles = new OpenLayers.StyleMap({
          "default": new OpenLayers.Style({
            pointRadius: 8,
            fillColor: "#ffcc66",
            strokeColor: "#ff9933",
            strokeWidth: 2,
            graphicZIndex: 1,
            cursor: "pointer"
          }),
          "select": new OpenLayers.Style({
            fillColor: "#66ccff",
            strokeColor: "#3399ff",
            graphicZIndex: 2
          })
        });

        var points = new OpenLayers.Layer.Vector("Points", {
          styleMap: styles,
          rendererOptions: {zIndexing: true}
        });

        points.addFeatures(features);
        map.addLayer(points);

        //Add a selector control with popup functions
        var select = new OpenLayers.Control.SelectFeature(points, { onSelect: createPopup, onUnselect: destroyPopup });
        map.addControl(select);
        select.activate();

        map.zoomToExtent(bounds);

        function createPopup(feature) {
          feature.popup = new OpenLayers.Popup.FramedCloud("pop",
            feature.geometry.getBounds().getCenterLonLat(),
            null,
            'Team: ' + feature.attributes.team,
            null,
            true,
            function () {
              select.unselectAll();
            }
          );

          map.addPopup(feature.popup);
        }

        function destroyPopup(feature) {
          feature.popup.destroy();
          feature.popup = null;
        }
      })
      .catch(function (error) {
        $scope.error = true;
        console.log(error);
      })
      .finally(function () {
        $scope.loading = false;
      });
  });
