angular
        .module('app')
        .controller('carouselCtrl', ['$scope', '$rootScope', 'Carousel', '$routeParams',
            function($scope, $rootScope, Carousel, $routeParams) {
                if ($routeParams.Lan) {
                    if (/[A-Z]{2}/.test($routeParams.Lan)) {
                        Carousel.get().then(function(data) {
                            $scope.items = data;
                        });
                        if ($routeParams.Lan === "EN") {
                            $rootScope.language = "EN";
                            $rootScope.anotherlanguage = "DU";
                        } else if ($routeParams.Lan === "DU") {
                            $rootScope.language = "DU";
                            $rootScope.anotherlanguage = "EN";
                        }
                    } else {
                        window.location.hash = "#/";
                    }
                } else {
                    Carousel.get().then(function(data) {
                        $scope.items = data;
                    });
                    if ($routeParams.Lan === "EN") {
                        $rootScope.language = "EN";
                        $rootScope.anotherlanguage = "DU";
                    } else if ($routeParams.Lan === "DU") {
                        $rootScope.language = "DU";
                        $rootScope.anotherlanguage = "EN";
                    }
                }
            }]);


