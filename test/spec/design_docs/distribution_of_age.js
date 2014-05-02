'use strict';

describe('Distribution of Age View', function () {
  var db = null;

  beforeEach(function (done) {
    recreateSurveyTestDB(function (d) {
      db = d;
      done();
    });
  });

  it('should generate the correct data', function (done) {
    db.query(survey_distribution_of_age_map_reduce, { reduce: true, include_docs: true }, function (err, response) {
      expect(err).toBeNull();
      expect(response.total_rows).toEqual(results.keys.length);

      for (var i = 0; i < results.keys.length; i++) {
        var row = response.rows[i];
        expect(JSON.stringify(row.key)).toEqual(JSON.stringify(results.keys[i]));
        expect(row.value).toEqual(results.values[i]);
      }

      done();
    });
  });

  var results = {
    keys: [
      ["children", 0, "tras"],
      ["children", 12, "jacob"],
      ["children", 24, "jacob"],
      ["children", 24, "tras"],
      ["children", 36, "jacob"],
      ["children", 36, "tras"],
      ["members", 1, "jacob"],
      ["members", 2, "jacob"],
      ["members", 2, "tras"],
      ["members", 3, "jacob"],
      ["members", 3, "tras"],
      ["members", 25, "jacob"],
      ["members", 29, "jacob"],
      ["members", 33, "tras"],
      ["members", 35, "jacob"],
      ["members", 45, "jacob"],
      ["members", 56, "jacob"],
      ["members", 85, "jacob"]
    ],
    values: [1, 1, 1, 4, 2, 2, 1, 1, 4, 2, 2, 1, 1, 1, 1, 2, 1, 1]
  };
});
