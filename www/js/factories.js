todoBluefish

    .factory('goalsFactory', function(){
        var Goals = {};

        /**
         * currentGoal variable contain goal with processed information
         * percentage, subject with trusted html
         */
        var currentGoal = null

        return {
            loadGoals: function() {
                if ( ! angular.isUndefined( window.localStorage['goals'] ) ) {
                    Goals = JSON.parse( window.localStorage['goals'] );
                } else {
                    Goals = this.getGoalsTmpl();
                }
            },

            saveGoals: function() {
                window.localStorage['goals'] = angular.toJson( Goals );
            },

            getAllGoals: function() { return Goals; },
            getCurrentGoal: function() { return currentGoal; }, // get back goal with processed information
            getTotalGoals: function(){ return Goals.list.length },

            getActiveGoalsNum: function() {
                var activeGoals = 0;
                for( var i = 0, lengthI = Goals.list.length; i < lengthI; i++ ){
                    if ( ! this.testIfGoalIsCompleted( Goals.list[i] ) ) activeGoals++;
                }
                return activeGoals;
            },

            getDoneGoalsNum: function() {
                var doneGoals = 0;
                for( var i = 0, lengthI = Goals.list.length; i < lengthI; i++ ){
                    if ( this.testIfGoalIsCompleted( Goals.list[i] ) ) doneGoals++;
                }
                return doneGoals;
            },

            setCurrentGoal: function( newGoal ) { currentGoal = newGoal; },

            getCurrentGoalRaw: function() {
                for( var i = 0, length = Goals.list.length; i<length; i++ ){
                    if ( currentGoal.id == Goals.list[i].id ) return Goals.list[i];
                }
                return false;
            },

            addGoal: function( newGoal ) { Goals.list.push( newGoal ); },

            getGoalWithMostTasks: function() {
                var goal = { id: '', tasks: 0 };
                for( var i = 0, lengthI = Goals.list.length; i < lengthI; i++ ){
                    var tasks = Goals.list[i].hasOwnProperty('tasks') ? Goals.list[i].tasks : [];
                    if ( goal.tasks <= tasks.length ) {
                        goal.id = i;
                        goal.tasks = tasks.length;
                    }
                }
                return Goals.list[ goal.id ];
            },

            testIfGoalIsCompleted: function( goal ) {
                var doneTasks = 0;
                for( var j = 0, lengthJ = goal.tasks.length; j < lengthJ; j++ ) {
                    if ( goal.tasks[j].done ) doneTasks++;
                }
                return doneTasks == goal.tasks.length;
            },

            getOldestGoal: function() {
                var goal = { id: '', date: '9999-00-00 00:00:00' };
                for( var i = 0, lengthI = Goals.list.length; i < lengthI; i++ ){
                    if ( goal.date >= Goals.list[i].timestamp.added &&
                            ! this.testIfGoalIsCompleted( Goals.list[i] ) ) {
                        goal.id = i;
                        goal.date = Goals.list[i].timestamp.added;
                    }
                }
                return Goals.list[ goal.id ];
            },

            getNewestGoal: function() {
                var goal = { id: '', date: '0000-00-00 00:00:00' };
                for( var i = 0, lengthI = Goals.list.length; i < lengthI; i++ ){
                    if ( goal.date <= Goals.list[i].timestamp.added &&
                            ! this.testIfGoalIsCompleted( Goals.list[i] ) ) {
                        goal.id = i;
                        goal.date = Goals.list[i].timestamp.added;
                    }
                }
                return Goals.list[ goal.id ];
            },

            /*
             * Load template object of goals
             */
            getGoalsTmpl: function() {
                return {
                    "list": [
                        {
                            "id": "1",
                            "subject": "I want to create new android app",
                            "color": "#019CDF",
                            "timestamp": {
                                "added": "2014-10-20 12:03:56",
                                "edited": "2014-10-20 15:10:12"
                            },
                            "tasks": [
                                { "name": "Learn HTML5", "done": true },
                                { "name": "Learn CSS5", "done": true },
                                { "name": "Learn JS", "done": false }
                            ]
                        },
                        {
                            "id": "2",
                            "subject": "I want to make new portfolio",
                            "color": "#FF3B2F",
                            "timestamp": {
                                "added": "2014-10-21 12:14:46",
                                "edited": "2014-10-22 10:10:12"
                            },
                            "tasks": [
                                { "name": "Make new design", "done": true },
                                { "name": "HTML+ CSS", "done": false },
                                { "name": "Add JS", "done": false }
                            ]
                        },
                        {
                            "id": "3",
                            "subject": "I want to create new website",
                            "color": "#E5E92F",
                            "timestamp": {
                                "added": "2014-09-21 12:14:46",
                                "edited": "2014-09-22 10:10:12"
                            },
                            "tasks": [
                                { "name": "Make sketch", "done": true },
                                { "name": "Photoshop", "done": true },
                                { "name": "HTML + CSS", "done": false },
                                { "name": "Add JS", "done": false }
                            ]
                        },
                        {
                            "id": "4",
                            "subject": "Achieved goal",
                            "color": "#FF3B2F",
                            "timestamp": {
                                "added": "2014-08-22 12:03:56",
                                "edited": "2014-08-24 16:12:01"
                            },
                            "tasks": [
                                { "name": "Set archive goal", "done": true }
                            ]
                        },
                        {
                            "id": "5",
                            "subject": "I want to buy new car",
                            "color": "#F7385D",
                            "timestamp": {
                                "added": "2014-07-22 12:03:56",
                                "edited": "2014-07-24 16:12:01"
                            },
                            "tasks": [
                                { "name": "Decide what type", "done": true },
                                { "name": "Decide what color", "done": true },
                                { "name": "Decide what firm", "done": true },
                                { "name": "Decide when", "done": false },
                                { "name": "Decide why", "done": false }
                            ]
                        },
                        {
                            "id": "6",
                            "subject": "I want brand new laptop",
                            "color": "#43B25A",
                            "timestamp": {
                                "added": "2000-06-22 12:03:56",
                                "edited": "2014-06-24 16:12:01"
                            },
                            "tasks": [
                                { "name": "Decide what type", "done": true },
                                { "name": "Decide what color", "done": true },
                                { "name": "Decide what firm", "done": true },
                                { "name": "Decide when", "done": true },
                                { "name": "Decide why", "done": false }
                            ]
                        },
                        {
                            "id": "7",
                            "subject": "Some completed goal",
                            "color": "#43B25A",
                            "timestamp": {
                                "added": "1999-08-09 12:03:56",
                                "edited": "2014-08-10 16:12:01"
                            },
                            "tasks": [
                                { "name": "Set archive goal", "done": true },
                                { "name": "Test goal", "done": true },
                                { "name": "Choose color", "done": true }
                            ]
                        }
                    ]
                }
            }
        }
    });