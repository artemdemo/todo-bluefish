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
     * Task Page Controller
     * I'm using this page for both open and edit tasks
     */
    .controller('taskPageCtrl', function( $scope, $ionicModal ){
        $ionicModal.fromTemplateUrl('pages/goalPageSettings.html', function(modal) {
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

        $scope.selectColor = function( colorID ) {
          $scope.selectedColor = colorID;
        };

        $scope.openSettings = function() {
            $scope.settingsModal.show();
        };

        $scope.closeSettings = function() {
            $scope.settingsModal.hide();
        };
    })