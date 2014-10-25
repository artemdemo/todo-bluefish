var todoBluefish = angular.module('todoBluefish', ['ionic'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    'main-page': {
                        templateUrl: 'pages/home.html',
                        controller: 'homeCtrl'
                    }
                }
            })
            .state('goalPage', {
                url: '/goal/open',
                views: {
                    'main-page': {
                        templateUrl: 'pages/goalPage.html',
                        controller: 'goalPageCtrl'
                    }
                }
            })
            .state('goalEdit', {
                url: '/goal',
                views: {
                    'main-page': {
                        templateUrl: 'pages/goalEditPage.html',
                        controller: 'goalEditPageCtrl'
                    }
                }
            })
            .state('goalEdit.new',{
                // this state is child of 'goalEdit', therefor url will become '/goal/new'
                url: '/new',
                views: {
                    'goal-page': {
                        templateUrl: 'pages/goalEditPageFirst.html'
                    }
                }
            })
            .state('goalEdit.edit',{
                // url: '/goal/edit/2'
                url: '/edit/:goalID',
                views: {
                    'goal-page': {
                        templateUrl: 'pages/goalEditPageFirst.html'
                    }
                }
            })
            .state('goalEdit.tasks', {
                // url: '/goal/tasks'
                url: '/tasks',
                views: {
                    'goal-page': {
                        templateUrl: 'pages/goalEditPageSecond.html'
                    }
                }
            });
    });


