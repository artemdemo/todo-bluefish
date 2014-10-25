todoBluefish

    .factory('goalsFactory', function(){
        var Goals = {
            list: [
                {
                    subject: 'I want to create new android app',
                    color: '#019CDF',
                    timestamp: {
                        added: '',
                        edited: ''
                    },
                    tasks: [
                        { name: 'Learn HTML5', done: true },
                        { name: 'Learn CSS5', done: true },
                        { name: 'Learn JS', done: false }
                    ]
                },
                {
                    subject: 'I want to make new portfolio',
                    color: '#FF3B2F',
                    timestamp: {
                        added: '',
                        edited: ''
                    },
                    tasks: [
                        { name: 'Make new design', done: true },
                        { name: 'HTML+ CSS', done: false },
                        { name: 'Add JS', done: false }
                    ]
                }
            ]
        };

        var goalTemplate = { subject: '', color: '#019CDF', timestamp: { added: '', edited: '' }, tasks: [ {name: '', done: false} ] };

        var currentGoalIndex = 0;
        /**
         * curretnGoal variable contain goal with processed information
         * percentage, subject with trusted html
         */
        var currentGoal = null

        return {
            getAllGoals: function() { return Goals; },

            getGoalTemplate: function() { return goalTemplate },

            // get back goal with processed information
            getCurrentGoal: function() { return currentGoal; },

            getCurrentGoalIndex: function() { return currentGoalIndex },

            setCurrentGoal: function( newGoal, newGoalIndex ) {
                currentGoal = newGoal;
                currentGoalIndex = newGoalIndex;
            },

            getCurrentGoalTasks: function() { return Goals.list[currentGoalIndex].tasks; },

            getCurrentGoalRaw: function() { return Goals.list[currentGoalIndex] },

            addGoal: function( newGoal ) {
                Goals.list.push( newGoal );
            }
        }
    });