/**
 * Map/reduce functions for the 'survey/work_completed' view.
 *
 * Notes:
 *  - a team is identified by the lowercased name of its leader
 *  - 'measured' women and children are taken from the 'individuals' array of each household
 *  - statistics about household members (min, max and mean) include also members of the 'mortalities' array
 *
 * N.B. the functions are not used directly in the app but saved in a view on CouchDB.
 */

var work_completed = {
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

      var stats = {
        measured: {
          women: 0,
          children: 0
        },
        hh: []
      };

      for (prop in day.households) {
        var hh = day.households[prop];
        var hhStats = {
          members: hh.mortalities.length + hh.individuals.length,
          women: 0,
          children: 0
        };

        hh.mortalities.forEach(function (id) {
          var individual = day.individuals[id];
          if (individual.age <= 3)
            hhStats.children++;
          else if (individual.gender === 'F')
            hhStats.women++;
        });

        hh.individuals.forEach(function (id) {
          var individual = day.individuals[id];
          if (individual.age <= 3) {
            hhStats.children++;
            stats.measured.children++;
          }
          else if (individual.gender === 'F') {
            hhStats.women++;
            stats.measured.women++;
          }
        });

        stats.hh.push(hhStats);
      }

      emit(team.toLowerCase(), stats);
    }
  },

  reduce: function (keys, values) {
    var stats = {
      clusters: values.length,
      measured: {
        women: 0,
        children: 0
      },
      hh: {
        n: 0,
        members: {
          n: 0,
          min: Infinity,
          max: 0,
          mean: 0
        },
        women: {
          n: 0,
          min: Infinity,
          max: 0,
          mean: 0
        },
        children: {
          n: 0,
          min: Infinity,
          max: 0,
          mean: 0
        }
      }
    };

    values.forEach(function (value) {
      stats.measured.women += value.measured.women;
      stats.measured.children += value.measured.children;
      stats.hh.n += value.hh.length;

      value.hh.forEach(function (hh) {
        ['members', 'women', 'children'].forEach(function (prop) {
          stats.hh[prop].n += hh[prop];
          stats.hh[prop].min = Math.min(stats.hh[prop].min, hh[prop]);
          stats.hh[prop].max = Math.max(stats.hh[prop].max, hh[prop]);
        });
      });
    });

    if (stats.hh.n) {
      ['members', 'women', 'children'].forEach(function (prop) {
        stats.hh[prop].mean = stats.hh[prop].n / stats.hh.n;
      });
    }

    return stats;
  }
};
