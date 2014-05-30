'use strict';

describe('Work Completed View', function () {
  var db = null;

  beforeEach(function (done) {
    recreateSurveyTestDB(function (d) {
      db = d;
      done();
    });
  });

  it('should generate the correct data', function (done) {
    db.query(survey_work_completed_map_reduce, { reduce: true, include_docs: true }, function (err, response) {
      expect(err).toBeNull();
      expect(response.total_rows).toEqual(2);

      var row = response.rows[0];
      expect(row.key).toEqual('jacob');
      expect(JSON.stringify(row.value)).toEqual(JSON.stringify(results[0]));

      row = response.rows[1];
      expect(row.key).toEqual('tras');
      expect(JSON.stringify(row.value)).toEqual(JSON.stringify(results[1]));

      done();
    });
  });

  var results = [
    {
      clusters: 2,
      measured: {women: 4, children: 4},
      hh: {
        n: 4,
        min: 1,
        max: 3,
        mean: 2,
        members: {n: 13, min: 2, max: 4, mean: 3.25},
        women: {n: 4, min: 1, max: 1, mean: 1},
        children: {n: 4, min: 0, max: 2, mean: 1},
        gpslocs: [
          {lon: -111.86770775, lat: 40.741767116666665},
          {lon: -111.86770775, lat: 40.741767116666665},
          {lon: -111.86770775, lat: 40.741767116666665}
        ]
      }
    },
    {
      clusters: 1,
      measured: {women: 1, children: 6},
      hh: {
        n: 3,
        min: 3,
        max: 3,
        mean: 3,
        members: {n: 12, min: 0, max: 10, mean: 4},
        women: {n: 2, min: 0, max: 2, mean: 0.67},
        children: {n: 7, min: 0, max: 5, mean: 2.33},
        gpslocs: []
      }
    }
  ];
});
