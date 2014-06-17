var INTEGER_REGEXP = /^\-?\d+$/;
var TIME_REGEXP = /^([01]\d|2[0-3]):?([0-5]\d)$/;
var DATE_REGEXP = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
var PHONE_REGEXP = /^(?:\+?\d{2}[ -]?[\d -][\d -]+)$/;
angular
        .module('app')
        .controller('reservationCtrl', ['$scope', '$rootScope', '$http', '$route', '$routeParams',
            function($scope, $rootScope, $http, $route, $routeParams) {
                if (/[A-Z]{2}/.test($routeParams.Lan)) {
                    $scope.nameErr = {
                        "EN": "Name field can't be empty!",
                        "DU": "Naam veld kan niet leeg zijn!"
                    };
                    $scope.dateErr = {
                        "past": {
                            "EN": "Date is in past!",
                            "DU": "Datum ligt in het verleden!"
                        },
                        "invalid": {
                            "EN": "Invalid Date!",
                            "DU": "Ongeldige datum!"
                        },
                        "try": {
                            "EN": "Try MM/DD/YYYY",
                            "DU": "Proberen MM/DD/YYYY"
                        }
                    };
                    $scope.timeErr = {
                        "empty": {
                            "EN": "Time field can not be empty!",
                            "DU": "Tijd veld kan niet leeg zijn!"
                        },
                        "invalid": {
                            "EN": "Invalid Time!",
                            "DU": "Ongeldige tijd!"
                        },
                        "try": {
                            "EN": "Try HHMM or HH:MM",
                            "DU": "Proberen HHMM of HH:MM"
                        }
                    };
                    $scope.guestsErr = {
                        "empty": {
                            "EN": "Total Guests field can't be empty!",
                            "DU": "Totaal aantal Gasten veld mag niet leeg zijn! "
                        },
                        "invalid": {
                            "EN": "Invalid number!",
                            "DU": "Ongeldig nummer!"
                        }
                    };
                    $scope.phoneErr = {
                        "invalid": {
                            "EN": "Invalid phone number!",
                            "DU": "Ongeldig telefoonnummer!"
                        },
                        "try": {
                            "EN": "Allowed special characters: + - space",
                            "DU": "Toegestane speciale tekens: + - spatie"
                        }
                    };
                    $scope.emailErr = {
                        "empty": {
                            "EN": "Email field can't be empty!",
                            "DU": "E-mail veld kan niet leeg zijn!"
                        },
                        "invalid": {
                            "EN": "Invalid Email!",
                            "DU": "Ongeldige e-mail! "
                        },
                        "try": {
                            "EN": "Try example@zzz.zz",
                            "DU": "Proberen example@zzz.zz"
                        }
                    };
                    
                    $scope.master = {};
                    $scope.response = {
                        "EN": "Reservation Made Successfully.",
                        "DU": "Reservering met succes gedaan."
                    };
                    $scope.error = {
                        "EN": "Reservation Failed!",
                        "DU": "Reservering mislukt!"
                    };
                    $scope.close = {
                        "EN": "close",
                        "DU": "sluiten"
                    };

                    if ($routeParams.Lan === "EN") {
                        $rootScope.language = "EN";
                        $rootScope.anotherlanguage = "DU";
                    } else if ($routeParams.Lan === "DU") {
                        $rootScope.language = "DU";
                        $rootScope.anotherlanguage = "EN";
                    }

                    $scope.reserve = function(guest) {
                        $http({
                            url: "services/reservation.php",
                            method: "POST",
                            data: JSON.stringify(guest),
                            headers: {
                                "Content-Type": "application/json; application/x-www-form-urlencoded"
                            }
                        }).success(function(response) {

                            if (response === "200 OK") {


                                var div = document.createElement('div');
                                div.setAttribute('class', 'reservation-response');
                                div.style.height = $(document).height() + "px";

                                var elements = '<div class="response-box container bg-success">';
                                elements += '<div class="row"><a ng-href="#/reservation" class="pull-right btn closeSuccess" style="color: grey">' + $scope.close[$rootScope.language] + ' <span class="glyphicon glyphicon-remove"></span></a></div>';
                                elements += '<div class="row">';
                                elements += '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center">';
                                elements += '<span class="glyphicon glyphicon-ok response-ok"></span>';
                                elements += '</div>';
                                elements += '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 text-center">';
                                elements += '<h2 class="response-ok">' + $scope.response[$rootScope.language] + '</h2>';
                                elements += '</div>';
                                elements += '</div>';
                                elements += '</div>';

                                div.innerHTML = elements;
                                document.body.appendChild(div);

                                // Select the target element and the top offset from it
                                var targetValue = $('body').offset().top;

                                // Animate the scrollTop property of html element from its current position to targetValue
                                $('html,body').animate({scrollTop: targetValue}, 'slow');

                                /*
                                 setTimeout(function() {
                                 $('.reservation-response').fadeOut(function() {
                                 location.reload();
                                 });
                                 }, 3000);
                                 */
                            } else {
                                var div = document.createElement('div');
                                div.setAttribute('class', 'reservation-response');
                                div.style.height = $(document).height() + "px";

                                var elements = '<div class="response-box container bg-danger">';
                                elements += '<div class="row"><a href="#/reservation" class="pull-right btn closeError" style="color: grey">' + $scope.close[$rootScope.language] + ' <span class="glyphicon glyphicon-remove"></span></a></div>';
                                elements += '<div class="row">';
                                elements += '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center">';
                                elements += '<span class="glyphicon glyphicon-warning-sign response-danger"></span>';
                                elements += '</div>';
                                elements += '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 text-center">';
                                elements += '<h2 class="response-danger">' + $scope.error[$rootScope.language] + '</h2>';
                                elements += '<p>Error: ' + response + '<p>';
                                elements += '</div>';
                                elements += '</div>';
                                elements += '</div>';

                                div.innerHTML = elements;
                                document.body.appendChild(div);

                                // Select the target element and the top offset from it
                                var targetValue = $('body').offset().top;

                                // Animate the scrollTop property of html element from its current position to targetValue
                                $('html,body').animate({scrollTop: targetValue}, 'slow');
                            }
                        }).error(function(error) {
                            console.log("error: " + error);


                            var div = document.createElement('div');
                            div.setAttribute('class', 'reservation-response');
                            div.style.height = $(document).height() + "px";

                            var elements = '<div class="response-box container bg-danger">';
                            elements += '<div class="row"><a href="#/reservation" class="pull-right btn closeError" style="color: grey">' + $scope.close[$rootScope.language] + ' <span class="glyphicon glyphicon-remove"></span></a></div>';
                            elements += '<div class="row">';
                            elements += '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center">';
                            elements += '<span class="glyphicon glyphicon-warning-sign response-danger"></span>';
                            elements += '</div>';
                            elements += '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 text-center">';
                            elements += '<h2 class="response-danger">' + $scope.error[$rootScope.language] + '</h2>';
                            elements += '<p>Error: ' + error + '<p>';
                            elements += '</div>';
                            elements += '</div>';
                            elements += '</div>';

                            div.innerHTML = elements;
                            document.body.appendChild(div);

                            // Select the target element and the top offset from it
                            var targetValue = $('body').offset().top;

                            // Animate the scrollTop property of html element from its current position to targetValue
                            $('html,body').animate({scrollTop: targetValue}, 'slow');

                            /*
                             setTimeout(function() {
                             $('.reservation-response').fadeOut(function() {
                             $('.reservation-response').remove();
                             });
                             }, 3000);
                             */
                        });
                    };

                    $scope.isUnchanged = function(guest) {
                        return angular.equals(guest, $scope.master);
                    };

                    $scope.fields = {
                        "EN": {
                            "title": "Reservation",
                            "name": "Name",
                            "reservation_time": "Time",
                            "total_guests": "Total Guests",
                            "phone_number": "Phone Number",
                            "extra_info": "Extra information",
                            "btn": "Make Reservation"
                        },
                        "DU": {
                            "title": "Reservatie",
                            "name": "Naam",
                            "reservation_time": "Tijd",
                            "total_guests": "Aantal Personen",
                            "phone_number": "Phone",
                            "extra_info": "Boodschap",
                            "btn": "Reserveer"
                        }
                    };
                } else {
                    window.location.hash = "#/" + $rootScope.language + "/reservation";
                }
            }])
        .directive('integer', function($rootScope) {
            return {
                require: 'ngModel',
                link: function(scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(function(viewValue) {
                        if (INTEGER_REGEXP.test(viewValue)) {
                            // it is valid
                            ctrl.$setValidity('integer', true);
                            return viewValue;
                        } else if (viewValue === undefined || viewValue === "") {
                            ctrl.$setValidity('integer', false);
                            scope.guestsErrMsg = scope.guestsErr.empty[$rootScope.language];
                            return undefined;
                        } else {
                            // it is invalid, return undefined (no model update)
                            ctrl.$setValidity('integer', false);
                            scope.guestsErrMsg = scope.guestsErr.invalid[$rootScope.language];
                            return undefined;
                        }
                    });
                }
            };
        })
        .directive('time', function($rootScope) {
            return {
                require: 'ngModel',
                link: function(scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(function(viewValue) {
                        if (TIME_REGEXP.test(viewValue)) {
                            // it is valid
                            ctrl.$setValidity('time', true);
                            return viewValue;
                        } else if (viewValue === undefined || viewValue === "") {
                            ctrl.$setValidity('time', false);
                            scope.timeErrMsg = scope.timeErr.empty[$rootScope.language];
                            scope.timeErrTry = scope.timeErr.try[$rootScope.language];
                            return undefined;
                        } else {
                            // it is invalid, return undefined (no model update)
                            ctrl.$setValidity('time', false);
                            scope.timeErrMsg = scope.timeErr.invalid[$rootScope.language];
                            scope.timeErrTry = scope.timeErr.try[$rootScope.language];
                            return undefined;
                        }
                    });
                }
            };
        })
        .directive('date', function($rootScope) {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {
                    ctrl.$parsers.unshift(function(viewValue) {
                        if (DATE_REGEXP.test(viewValue)) {
                            //check if it is in past or not
                            var param = new Date(viewValue),
                                now = new Date();
                            if (param.getFullYear() === now.getFullYear()) {
                                if (param.getMonth() >= now.getMonth()) {
                                    if (param.getDate() >= now.getDate()) {
                                        // it is valid
                                        ctrl.$setValidity('date', true);
                                        return viewValue;
                                    }
                                }
                                ctrl.$setValidity('date', false); 
                                scope.dateErrMsg = scope.dateErr.past[$rootScope.language];
                                return undefined;
                            }
                        } else {
                            // it is invalid, return undefined (no model update)
                            ctrl.$setValidity('date', false);
                            scope.dateErrMsg = scope.dateErr.invalid[$rootScope.language];
                            scope.dateErrTry = scope.dateErr.try[$rootScope.language];
                            return undefined;
                        }
                    });
                }
            };
        })
        .directive('phone', function($rootScope) {
            return {
                require: 'ngModel',
                link: function(scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(function(viewValue) {
                        if (PHONE_REGEXP.test(viewValue)) {
                            // it is valid
                            ctrl.$setValidity('phone', true);
                            return viewValue;
                        } else {
                            // it is invalid, return undefined (no model update)
                            ctrl.$setValidity('phone', false);
                            scope.phoneErrMsg = scope.phoneErr.invalid[$rootScope.language];
                            scope.phoneErrTry = scope.phoneErr.try[$rootScope.language];
                            return undefined;
                        }
                    });
                }
            };
        });