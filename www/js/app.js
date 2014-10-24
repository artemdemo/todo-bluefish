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
                        templateUrl: 'pages/home.html'
                    }
                }
            })
            .state('goalNew', {
                url: '/goal',
                views: {
                    'main-page': {
                        templateUrl: 'pages/goalNew.html',
                        controller: 'taskPageCtrl'
                    }
                }
            })
            .state('goalNew.subj',{
                // this state is child of 'goalNew', therefor url will become '/goal/new'
                url: '/new',
                views: {
                    'goal-page': {
                        templateUrl: 'pages/goalNewFirst.html'
                    }
                }
            })
            .state('goalNew.tasks', {
                url: '/tasks',
                views: {
                    'goal-page': {
                        templateUrl: 'pages/goalNewSecond.html'
                    }
                }
            });
    });


