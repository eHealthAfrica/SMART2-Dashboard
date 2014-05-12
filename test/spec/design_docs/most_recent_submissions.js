'use strict';

describe('Most Recent Submissions View', function () {
  var db = null;

  beforeEach(function (done) {
    recreateSurveyTestDB(function (d) {
      db = d;
      done();
    });
  });

  it('should generate the correct data', function (done) {
    db.query(survey_most_recent_submissions_map_reduce, { reduce: true, include_docs: true }, function (err, response) {
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
    keys: [ 'jacob', 'tras' ],
    values: [ new Date('2014-04-19'), new Date('2014-04-07') ]};
});
