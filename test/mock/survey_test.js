'use strict';

function recreateSurveyTestDB(cb) {
  PouchDB.destroy('survey_test', function (err) {
    if (!err) {
      var db = new PouchDB('survey_test');
      db.bulkDocs({ docs: survey_test_docs }, function (err) {
        if (!err)
          cb(db);
        else
          throw err;
      });
    }
    else
      throw err;
  });
}

var survey_test_docs = [
  {
    "registered_personnel": {
      "2": {
        "telephone": null,
        "gender": "F",
        "age": 35,
        "email": null,
        "name": "tras"
      }
    },
    "2014-04-07": {
      "currently_logged_in": {
        "assistant": 2,
        "anthro": 2,
        "logged_in_at": "2014-04-07T09:36:45",
        "teamleader": 2
      },
      "ind_id": 12,
      "households": {
        "2": {
          "gpsloc": 0,
          "mortalities": [ 3, 7, 8, 9, 10 ],
          "individuals": [ 1, 2, 4, 5, 6 ],
          "permission": true
        },
        "3": {
          "gpsloc": 0,
          "mortalities": [ ],
          "individuals": [ 11, 12 ],
          "permission": true
        },
        "33": {
          "gpsloc": 0,
          "mortalities": [ ],
          "individuals": [ ],
          "permission": true
        }
      },
      "last_used_time": "2014-04-07T04:28:29",
      "individuals": {
        "1": {
          "muac": 225,
          "age_type": "Years",
          "name": "tras",
          "weight": 48,
          "edema": "No",
          "gender": "M",
          "age": 3,
          "height_type": "Child Standing (Height)",
          "born_status": false,
          "birthdate": [ "2", "10", "1999" ],
          "height": 48,
          "complete_status": true,
          "age_months": null
        },
        "2": {
          "breastfeeding": "No",
          "muac": 55,
          "age_type": "Years",
          "name": "bcvc",
          "weight": 25,
          "pregnant": "No",
          "gender": "F",
          "age": 33,
          "born_status": false,
          "height": 33,
          "complete_status": true
        },
        "3": {
          "status": "Died",
          "gender": "M",
          "age": 89,
          "age_type": "Years",
          "name": "a"
        },
        "4": {
          "muac": 33,
          "age_type": "Years",
          "name": "a",
          "weight": 25,
          "edema": "No",
          "gender": "F",
          "age": 2,
          "height_type": "Child Recumbent (Length)",
          "born_status": false,
          "birthdate": [ "3", "5", "2005" ],
          "height": 54,
          "complete_status": true,
          "age_months": null
        },
        "5": {
          "muac": 26,
          "age_type": "Years",
          "name": "asdv",
          "weight": 25,
          "height_type": "Child Recumbent (Length)",
          "gender": "M",
          "age": 2,
          "edema": "Yes",
          "born_status": false,
          "birthdate": [ "2", "12", "2000" ],
          "height": 65,
          "complete_status": true,
          "age_months": null
        },
        "6": {
          "age_type": "Years",
          "name": "trasd",
          "gender": "F",
          "age": 2,
          "born_status": false,
          "complete_status": false
        },
        "7": {
          "status": "Left",
          "gender": "M",
          "age": 39,
          "age_type": "Years",
          "name": "vc"
        },
        "8": {
          "status": "Left",
          "gender": "F",
          "age": 23,
          "age_type": "Years",
          "name": "trasddsd"
        },
        "9": {
          "status": "Died",
          "gender": "F",
          "age": 0,
          "age_type": "Years",
          "name": "asd"
        },
        "10": {
          "status": "Left",
          "gender": "M",
          "age": 55,
          "age_type": "Years",
          "name": "c"
        },
        "11": {
          "muac": 25,
          "age_type": "Years",
          "name": "tcdvc",
          "weight": 55,
          "height_type": "Child Standing (Height)",
          "gender": "F",
          "age": 2,
          "edema": "Yes",
          "born_status": false,
          "birthdate": [ "2", "8", "2010" ],
          "height": 35,
          "complete_status": true,
          "age_months": null
        },
        "12": {
          "age_type": "Years",
          "name": "vcv",
          "gender": "M",
          "age": 3,
          "born_status": "Joined",
          "complete_status": false
        }
      },
      "tools": {
        "Height Board": [ 0, 0 ],
        "Child MUAC": [ 0, 0 ],
        "Scale": [ 0, 0 ],
        "Adult MUAC": [ 0, 0 ],
        "tools_standardized": true
      }
    }
  },
  {
    "registered_personnel": {
      "2": {
        "telephone": null,
        "gender": "M",
        "age": 24,
        "email": null,
        "name": "jacob"
      }
    },
    "2014-04-14": {
      "currently_logged_in": {
        "assistant": 2,
        "anthro": 2,
        "logged_in_at": "2014-04-14T15:44:42",
        "teamleader": 2
      },
      "ind_id": 4,
      "households": {
        "1": {
          "gpsloc": {
            "lat": 40.741767116666665,
            "speed": 0,
            "altitude": 1318.5,
            "lon": -111.86770775,
            "bearing": 0
          },
          "mortalities": [ 4 ],
          "individuals": [ 1, 2, 3 ],
          "permission": true
        }
      },
      "last_used_time": "2014-04-14T03:47:10",
      "individuals": {
        "1": {
          "muac": 23,
          "age_type": "Years",
          "name": "ggg",
          "weight": 35,
          "height_type": "Child Standing (Height)",
          "gender": "F",
          "age": 2,
          "edema": "No",
          "born_status": false,
          "birthdate": [ "2", "10", "2007" ],
          "height": 68,
          "complete_status": true,
          "age_months": null
        },
        "2": {
          "age_type": "Years",
          "name": "hvgg",
          "gender": "M",
          "age": 45,
          "born_status": false,
          "complete_status": false
        },
        "3": {
          "breastfeeding": "No",
          "muac": 63,
          "age_type": "Years",
          "name": "mhvb",
          "weight": 35,
          "pregnant": "No",
          "gender": "F",
          "age": 45,
          "born_status": false,
          "height": 25,
          "complete_status": true
        },
        "4": {
          "status": "Died",
          "gender": "M",
          "age": 85,
          "age_type": "Years",
          "name": "zzzz"
        }
      },
      "tools": {
        "Height Board": [ 3, 25 ],
        "Child MUAC": [ 35, 25 ],
        "Scale": [ 0, 223 ],
        "Adult MUAC": [ 3, 33 ],
        "tools_standardized": true
      }
    }
  },
  {
    "registered_personnel": {
      "2": {
        "gender": "M",
        "age": 24,
        "telephone": null,
        "name": "Jacob",
        "email": null
      }
    },
    "2014-04-19": {
      "currently_logged_in": {
        "assistant": 2,
        "anthro": 2,
        "logged_in_at": "2014-04-19T17:04:29",
        "teamleader": 2
      },
      "ind_id": 9,
      "households": {
        "1": {
          "gpsloc": {
            "lat": 40.741767116666665,
            "speed": 0,
            "altitude": 1318.5,
            "lon": -111.86770775,
            "bearing": 0
          },
          "mortalities": [ 7 ],
          "individuals": [ 5, 6 ],
          "permission": true
        },
        "3": {
          "gpsloc": { },
          "mortalities": [ ],
          "individuals": [ 1, 2, 3, 4 ],
          "permission": true
        },
        "6": {
          "gpsloc": {
            "lat": 40.741767116666665,
            "speed": 0,
            "altitude": 1318.5,
            "lon": -111.86770775,
            "bearing": 0
          },
          "mortalities": [ ],
          "individuals": [ 8, 9 ],
          "permission": true
        }
      },
      "last_used_time": "2014-04-19T05:08:47",
      "individuals": {
        "1": {
          "muac": 33,
          "age_type": "Years",
          "name": "Ellen",
          "weight": 23,
          "height_type": "Child Standing (Height)",
          "gender": "F",
          "age": 3,
          "edema": "No",
          "born_status": false,
          "birthdate": [ "2", "10", "2011" ],
          "height": 45,
          "complete_status": true,
          "age_months": null
        },
        "2": {
          "breastfeeding": "Yes",
          "muac": 56,
          "age_type": "Years",
          "name": "Paige",
          "weight": 110,
          "pregnant": "No",
          "gender": "F",
          "age": 25,
          "born_status": false,
          "height": 55,
          "complete_status": true
        },
        "3": {
          "muac": 25,
          "age_type": "Years",
          "name": "Thomas",
          "weight": 18,
          "height_type": "Child Standing (Height)",
          "gender": "M",
          "age": 1,
          "edema": "No",
          "born_status": "Born",
          "height": 40,
          "complete_status": true,
          "age_months": 13
        },
        "4": {
          "age_type": "Years",
          "name": "David",
          "gender": "M",
          "age": 35,
          "born_status": false,
          "complete_status": false
        },
        "5": {
          "age_type": "Years",
          "name": "Dan",
          "gender": "M",
          "age": 85,
          "born_status": false,
          "complete_status": false
        },
        "6": {
          "age_type": "Years",
          "name": "Mae",
          "gender": "F",
          "age": 56,
          "born_status": "Joined",
          "complete_status": false
        },
        "7": {
          "status": "Died",
          "gender": "M",
          "age": 71,
          "age_type": "Years",
          "name": "Jimmy"
        },
        "8": {
          "age_type": "Years",
          "name": "Ben",
          "gender": "M",
          "age": 3,
          "born_status": false,
          "complete_status": false
        },
        "9": {
          "age_type": "Years",
          "name": "Hannah",
          "gender": "F",
          "age": 29,
          "born_status": "Joined",
          "complete_status": false
        }
      },
      "tools": {
        "Height Board": [ 25, 25 ],
        "Child MUAC": [ 35, 33.3 ],
        "Scale": [ 12, 10.2 ],
        "Adult MUAC": [ 32, 45 ],
        "tools_standardized": true
      }
    }
  }
];
