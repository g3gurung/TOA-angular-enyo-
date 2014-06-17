angular
        .module('app')
        .controller('pageCtrl', ['$scope', '$location', '$rootScope', 'Static',
            function($scope, $location, $rootScope, Static) {
                $scope.templates = {
                    "navBar": "templates/nav.html",
                    "content": "templates/staticContent.html"
                };
                $scope.activePath = '/';
                $scope.$on('$routeChangeSuccess', function() {
                    $scope.activePath = $location.path();
                });
                $rootScope.language = "DU";
                $rootScope.anotherlanguage = "EN";
                
                $scope.nav = {
                    "EN": ["Home", "General Menu", "Sushi Menu", "Reservation", "Gallery", "Contact"],
                    "DU": ["Home", "Algemene Menu", "Sushi Menu", "Reservatie", "Galerij", "Contact"]
                };
                $scope.setLan = function() {
                    if ($rootScope.language === "EN") {
                        
                        $rootScope.language = "DU";
                        $rootScope.anotherlanguage = "EN";
                        
                    } else if ($rootScope.language === "DU") {
                        
                        $rootScope.language = "EN";
                        $rootScope.anotherlanguage = "DU";
                        
                    }
                    
                    var activePath = window.location.hash;
                    
                    if(activePath.search($rootScope.anotherlanguage) > -1){
                        window.location.hash = activePath.replace($rootScope.anotherlanguage, $rootScope.language);
                    }else{
                        window.location.hash = "#/"+$rootScope.language;
                    }
                    
                };
                $scope.map = {
                    center: {
                        latitude: 50.879954,
                        longitude: 4.698179
                    },
                    zoom: 19
                };
                $scope.marker = {
                    coords: {
                        latitude: 50.879954,
                        longitude: 4.698179
                    }
                };
                $scope.infoWin = {
                    show: true,
                    templateUrl: 'templates/infoWin.html'
                };
                Static.get().then(function(data) {
                    $scope.staticContent = data;
                });
            }])
        ;


