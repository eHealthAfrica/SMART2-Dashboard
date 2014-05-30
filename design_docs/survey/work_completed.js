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

var survey_work_completed_map_reduce = {
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

      for (var prop in day.households) {
        var hh = day.households[prop];
        var hhStats = {
          members: hh.mortalities.length + hh.individuals.length,
          women: 0,
          children: 0,
          gpsloc: hh.gpsloc
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
        min: Infinity,
        max: 0,
        mean: 0,
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
        },
        gpslocs: []
      }
    };

    values.forEach(function (value) {
      // Women, Children measured
      stats.measured.women += value.measured.women;
      stats.measured.children += value.measured.children;

      // HH per cluster
      stats.hh.n += value.hh.length;
      stats.hh.min = Math.min(stats.hh.min, value.hh.length);
      stats.hh.max = Math.max(stats.hh.max, value.hh.length);

      // Members, Women and Children per HH
      value.hh.forEach(function (hh) {
        ['members', 'women', 'children'].forEach(function (prop) {
          stats.hh[prop].n += hh[prop];
          stats.hh[prop].min = Math.min(stats.hh[prop].min, hh[prop]);
          stats.hh[prop].max = Math.max(stats.hh[prop].max, hh[prop]);
        });

        if (hh.gpsloc && hh.gpsloc.lon !== undefined && hh.gpsloc.lat !== undefined)
          stats.hh.gpslocs.push({lon: hh.gpsloc.lon, lat: hh.gpsloc.lat});
      });
    });

    // HH per cluster (mean)
    if (stats.clusters)
      stats.hh.mean = Math.round(stats.hh.n / stats.clusters * 100) / 100;

    // Members, Women and Children per HH (mean)
    if (stats.hh.n) {
      ['members', 'women', 'children'].forEach(function (prop) {
        stats.hh[prop].mean = Math.round(stats.hh[prop].n / stats.hh.n * 100) / 100;
      });
    }

    return stats;
  }
};
