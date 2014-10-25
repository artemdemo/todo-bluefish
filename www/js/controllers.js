todoBluefish
    /**
     * Main Controller
     * Top controller of whole application
     */
    .controller('mainCtrl', function( $scope ){
        $scope.goBack = function() {
            window.history.back()
        }
    })

    /**
     * Home Page Controller
     */
    .controller('homeCtrl', function ( $scope, $sce, $state, goalsFactory ){
        $scope.goalsList = getGoalsList();

        function getGoalsList() {
            var list = goalsFactory.getAllGoals().list, readyList = [];

            for( var i = 0, lengthI = list.length; i < lengthI; i++ ){
                // Calculate percentage of done tasks
                var item = {}, tasks = list[i].hasOwnProperty('tasks') ? list[i].tasks : [];
                var doneTasks = 0;
                for( var j = 0, lengthJ = tasks.length; j < lengthJ; j++ ) {
                    if ( tasks[j].done ) doneTasks++;
                }
                // Get special design for first 2 words in subject
                var subj_arr = list[i].subject.split(/\s+/);
                var start = '<span class="b">'+ subj_arr.splice(0,2).join(" ") +'</span> ';
                item.subject = $sce.trustAsHtml( start + subj_arr.splice(2).join(" ") );
                item.percent = Math.round( doneTasks / j * 100 );
                readyList.push( item );
            }

            return readyList;
        }

        $scope.openGoal = function( goal, index ) {
            goalsFactory.setCurrentGoal(goal, index)
            $state.go('goalPage');
        }
    })

    .controller('goalPageCtrl', function( $scope, goalsFactory ){
        $scope.goal = goalsFactory.getCurrentGoal();
        $scope.goalID = goalsFactory.getCurrentGoalIndex();
        $scope.tasks = goalsFactory.getCurrentGoalTasks();
    })

    /**
     * Task Page Controller
     * I'm using this page for creating new goal and editing it
     */
    .controller('goalEditPageCtrl', function( $scope, $ionicModal, $state, goalsFactory ){
        $ionicModal.fromTemplateUrl('pages/goalEditPageSettings.html', function(modal) {
                $scope.settingsModal = modal;
            },
            {
                scope: $scope,
                animation: 'slide-in-up'
            });

        $scope.selectedColor = 0;

        $scope.settings = {
            colors: [
                { name: 'Blue', rgb: '#019CDF', checked: true },
                { name: 'Red', rgb: '#FF3B2F', checked: false },
                { name: 'Green', rgb: '#43B25A', checked: false },
                { name: 'Yellow', rgb: '#E5E92F', checked: false },
                { name: 'Purple', rgb: '#F7385D', checked: false }
            ]
        };

        $scope.firstTitle = $state.current.name == 'goalEdit.new' ? 'New goal' : 'Edit goal';
        $scope.secondTitle = $state.current.name == 'goalEdit.new' ? 'Add tasks' : 'Edit tasks';
        $scope.goal = goalsFactory.getGoalTemplate();
        $scope.goalID = undefined;

        if ( $state.current.name == 'goalEdit.edit' ) {
            $scope.goal = goalsFactory.getCurrentGoalRaw();
            $scope.goalID = goalsFactory.getCurrentGoalIndex();
        }

        $scope.selectColor = function( colorID ) {
          $scope.selectedColor = colorID;
        };

        $scope.openSettings = function() {
            $scope.currentGoal = goalsFactory.getCurrentGoal();
            $scope.settingsModal.show();
        };

        $scope.closeSettings = function() {
            $scope.settingsModal.hide();
        };

        $scope.addTask = function() {
            $scope.goal.tasks.push( {name: '', done: false} );
        };

        $scope.removeTask = function() {
            if ( $scope.goal.tasks.length > 1 ) {
                $scope.goal.color = $scope.settings.colors[$scope.selectedColor].rgb;
                $scope.goal.tasks.pop();
            }
        };

        $scope.saveGoal = function() {
            if ( angular.isUndefined( $scope.goalID ) && $scope.goal.subject ) {
                goalsFactory.addGoal( $scope.goal );
                $state.go('home');
            }
        }
    })

























