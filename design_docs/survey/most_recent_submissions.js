/**
 * Map/reduce functions for the 'survey/most_recent_submissions' view.
 *
 * N.B. the functions are not used directly in the app but saved in a view on CouchDB.
 */

var survey_most_recent_submissions_map_reduce = {
  map: function (doc) {
    if (!doc.registered_personnel) {
      return;
    }

    for (var prop in doc) {
      var day = doc[prop];
      if (!day.currently_logged_in)
        continue;

      var teamleader = doc.registered_personnel[day.currently_logged_in.teamleader];
      var team = teamleader ? teamleader.name : undefined;
      if (team)
        emit(team.toLowerCase(), prop);
    }
  },

  reduce: function (keys, values) {
    var date = new Date(0);

    values.forEach(function (value) {
      var d = new Date(value);
      if (d > date)
        date = d;
    });

    return date;
  }
};
