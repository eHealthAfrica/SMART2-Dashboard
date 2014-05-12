/**
 * Map/reduce functions for the 'survey/distribution_of_age' view.
 *
 * N.B. the functions are not used directly in the app but saved in a view on CouchDB.
 */

var survey_distribution_of_age_map_reduce = {
  map: function (doc) {
    if (!doc.registered_personnel) {
      return;
    }

    for (var prop in doc) {
      var day = doc[prop];
      if (!day.currently_logged_in) {
        continue;
      }

      var teamleader = doc.registered_personnel[day.currently_logged_in.teamleader];
      var team = teamleader ? teamleader.name : 'unknown';
      team = team.toLowerCase();

      for (prop in day.households) {
        var hh = day.households[prop];

        hh.mortalities.forEach(function (id) {
          var individual = day.individuals[id];
          if (individual.age <= 3)
            emit(['children', individual.age * 12, team], 1);
        });

        hh.individuals.forEach(function (id) {
          var individual = day.individuals[id];
          if (individual.age <= 3)
            emit(['children', individual.age * 12, team], 1);

          emit(['members', individual.age, team], 1);
        });
      }
    }
  },

  reduce: function(keys, values) {
    return sum(values);
  }
};
