'use strict';

angular.module('smart2App')
  .factory('surveyDB', function surveyDB(pouchdb) {
    return pouchdb.create('http://smart2.ehealth.org.ng:5984/surveys');
  })
  .factory('surveyWorkCompleted', function surveyWorkCompleted(surveyDB) {
    return {
      byTeam: function() {
        return surveyDB.query('survey/work_completed', { reduce: true, group_level: 1 });
      }
    };
  })
  .factory('distributionOfAge', function distributionOfAge(surveyDB) {
    return {
      byTeam: function() {
        return surveyDB.query('survey/distribution_of_age', { reduce: true, group_level: 2 });
      }
    };
  });
