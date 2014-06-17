angular
        .module('app')
        .controller('galleryCtrl', ['$scope', '$rootScope', 'Carousel', '$routeParams',
            function($scope, $rootScope, Carousel, $routeParams) {
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

                    $scope.counter = 10;
                    $scope.moreImage = function() {
                        var rem = $scope.items.length - $scope.counter;
                        if (rem > 0) {
                            $scope.counter = rem + $scope.counter+1;
                        }
                        $('.gallery_wrapper a').css('opacity', '0.65').css('cursor', 'default').css('text-decoration', 'none').css('color', 'grey');
                    };
                    $scope.viewImage = function(n) {
                        $scope.ndx = n;
                        var div = document.createElement('div');
                        div.setAttribute('class', 'bigimage');
                        div.setAttribute('id', 'BigImage');
                        div.style.height = $(document).height() + "px";
                        //var element = '<div class="bigimage" id="BigImage" ng-click="closeImage()">';
                        var elements = '<img src="images/' + $scope.items[n].image + '" class="fullsize" onclick="myEventHandler(event)" />';
                        elements += '<button class="btn btn-default closeBtn" onclick="closeBigImage(ele)"><span class="glyphicon glyphicon-remove"></span></button>';
                        elements += '<div class="gallery-dish-info text-center" onclick="myEventHandler(event)">';
                        elements += '<h2>' + $scope.items[n].item.dish_type + '</h2>';
                        elements += '<p>' + $scope.items[n].item.dish_name + '</p>';
                        elements += '</div>';
                        //element +=    '<div>';

                        div.innerHTML = elements;
                        document.body.appendChild(div);

                        // Select the target element and the top offset from it
                        var targetValue = $('body').offset().top;

                        // Animate the scrollTop property of html element from its current position to targetValue
                        $('html,body').animate({scrollTop: targetValue}, 'slow');
                    };
                } else {
                    window.location.hash = "#/" + $rootScope.language + "/gallery";
                }
            }]);


