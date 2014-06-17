/* 
 * Author: Prataksha Gurung
 * All rights reserverd.
 * 
 */
var app = angular.module('app', ['ui.router', 'ngRoute', 'google-maps']);

app.config(function($routeProvider) {
    $routeProvider
            .when('/', {
                controller: 'carouselCtrl',
                templateUrl: 'templates/carousel.html'
            })
            .when('/:Lan/feedback', {
                controller: '',
                templateUrl: 'templates/feedback.html'
            })
            .when('/:Lan', {
                controller: 'carouselCtrl',
                templateUrl: 'templates/carousel.html'
            })
            .when('/:Lan/reservation', {
                controller: 'reservationCtrl',
                templateUrl: 'templates/reservation.html'
            })
            .when('/:Lan/gallery', {
                controller: 'galleryCtrl',
                templateUrl: 'templates/gallery.html'
            })
            .when('/:Lan/menu', {
                controller: 'menuCtrl',
                templateUrl: 'templates/menu.html'
            })
            .when('/:Lan/sushiMenu', {
                controller: 'sushiMenuCtrl',
                templateUrl: 'templates/sushiMenu.html'
            })
            .otherwise({redirectTo: '/'});
});
/*
 app.run(function($rootScope){
 $rootScope.current = {"lan": "US", "image": "images/US.png"}; 
 });
 */