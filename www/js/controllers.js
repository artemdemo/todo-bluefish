todoBluefish
    .controller('mainCtrl', function( $scope ){
        $scope.goBack = function() {
            window.history.back()
        }
    })

    .controller('taskPageCtrl', function( $scope ){
        console.log( 'taskPageCtrl' );
    })