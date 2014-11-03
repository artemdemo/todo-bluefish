todoBluefish
    /**
     * Main Controller
     * Top controller of whole application
     */
    .controller('mainCtrl', function( $scope, goalsFactory ){
        goalsFactory.loadGoals();

        $scope.goBack = function() {
            window.history.back()
        };


    })

    /**
     * Home Page Controller
     */
    .controller('homeCtrl', function ( $scope, $sce, $state, goalsFactory ){
        $scope.goalsList = filterGoals();

        function filterGoals() {
            var list = goalsFactory.getAllGoals().list;
            var readyList = [], archiveList = [];

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
                item.color = list[i].color;
                item.id = list[i].id;
                item.tasks = list[i].tasks;
                if ( item.percent < 100 ) readyList.push( item );
                    else archiveList.push( item );
            }

            return readyList;
        }

        $scope.activeGoalsNum = goalsFactory.getActiveGoalsNum();

        $scope.openGoal = function( goal ) {
            goalsFactory.setCurrentGoal( goal );
            $state.go('goalPage');
        };

        // Save all goals
        goalsFactory.saveGoals();
    })

    /**
     * Statistics Page
     */
    .controller('statisticCtrl', function( $scope, $state, goalsFactory ){
        $scope.totalGoals = goalsFactory.getTotalGoals();
        $scope.doneGoals = goalsFactory.getDoneGoalsNum();
        $scope.goalWithMostTasks = goalsFactory.getGoalWithMostTasks();
        $scope.oldestGoal = goalsFactory.getOldestGoal();
        $scope.newestGoal = goalsFactory.getNewestGoal();

        $scope.openGoal = function( goal ) {
            goalsFactory.setCurrentGoal( goal );
            $state.go('goalPage');
        }
    })

    /**
     * Archive Page
     */
    .controller('archiveCtrl', function( $scope, $sce, $state, goalsFactory ){
        $scope.goalsList = filterArchiveGoals();

        function filterArchiveGoals() {
            var list = goalsFactory.getAllGoals().list;
            var archiveList = [];

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
                item.color = list[i].color;
                item.id = list[i].id;
                item.tasks = list[i].tasks;
                if ( item.percent == 100 ) archiveList.push( item );
            }
            return archiveList;
        }

        $scope.openGoal = function( goal ) {
            goalsFactory.setCurrentGoal( goal );
            $state.go('goalPage');
        }
    })

    /**
     * Goal Page - page is showing existing goal
     */
    .controller('goalPageCtrl', function( $scope, $timeout, goalsFactory ){
        $scope.goal = goalsFactory.getCurrentGoal();
        $scope.tasks = $scope.goal.tasks;

        $timeout(function(){
            $('.goal-text .b').css('color', $scope.goal.color);
        });

        $scope.calculateProgress = function() {
            var doneTasks = 0;
            for( var i = 0, length = $scope.tasks.length; i < length; i++ ) {
                if ( $scope.tasks[i].done ) doneTasks++;
            }
            $scope.goal.percent = Math.round( doneTasks / i * 100 );
        };

        $scope.calculateProgress();
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
        $scope.goal = { id: undefined, subject: '', color: '#019CDF', timestamp: { added: '', edited: '' }, tasks: [ {name: '', done: false} ] };

        if ( $state.current.name == 'goalEdit.edit' ) {
            $scope.goal = goalsFactory.getCurrentGoalRaw();
        }

        if ( $scope.goal.color ) {
            for ( var i=0, length=$scope.settings.colors.length; i<length; i++ ){
                if ( $scope.settings.colors[i].rgb == $scope.goal.color ) {
                    $scope.settings.colors[i].checked = true;
                } else {
                    $scope.settings.colors[i].checked = false;
                }
            }
        }

        $scope.selectColor = function( colorID ) {
            $scope.goal.color = $scope.settings.colors[colorID].rgb;
            $scope.selectedColor = colorID;
        };

        $scope.openSettings = function() {
            $scope.currentGoal = goalsFactory.getCurrentGoal();
            $scope.settingsModal.show();
        };

        $scope.closeSettings = function() {
            $scope.settingsModal.hide();
        };

        $scope.gotoTasksPage = function() {
            if ( $scope.goal.subject ) $state.go('goalEdit.tasks');
            else {
                var $textareaSubj = $('#goalEditPage').find('textarea');
                $textareaSubj.addClass('alert');
                setTimeout(function(){
                    $textareaSubj.removeClass('alert');
                },1500);
            }
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
            if ( angular.isUndefined( $scope.goal.id ) && $scope.goal.subject ) {
                // adding new goal to goalsFactory
                var today = new Date();
                $scope.goal.id = new Date().getTime(); // I really don't care for now what is id, therefore timestamp is unique enough for me
                $scope.goal.timestamp.added = today.format('Y-m-d H:i:s');
                $scope.goal.timestamp.edited =  today.format('Y-m-d H:i:s');
                goalsFactory.addGoal( $scope.goal );
            }
            $state.go('home');
        }
    })

	.controller('introCtrl', function( $scope, $state ){

		$scope.goToHomePage = function() {
			console.log(  );
			$state.go('home');
		};
	});

























