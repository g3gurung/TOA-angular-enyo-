angular
        .module('app')
        .controller('menuCtrl', ['$scope', '$rootScope', 'Menu', '$routeParams', function($scope, $rootScope, Menu, $routeParams) {
                if (/[A-Z]{2}/.test($routeParams.Lan)) {
                    Menu.get().then(function(data) {
                        $scope.menu = data;
                    });
                    if ($routeParams.Lan === "EN") {
                        $rootScope.language = "EN";
                        $rootScope.anotherlanguage = "DU";
                    } else if ($routeParams.Lan === "DU") {
                        $rootScope.language = "DU";
                        $rootScope.anotherlanguage = "EN";
                    }
                } else {
                    window.location.hash = "#/" + $rootScope.language + "/menu";
                }

            }]);