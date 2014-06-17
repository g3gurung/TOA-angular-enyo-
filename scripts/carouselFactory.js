angular
  .module('app')
  .factory('Carousel', ['$http', function($http) {
    return {
      get: function() {
        return $http.get('json/carousel.json').then(function(response) {
          return response.data;
        });
      }
    };
  }]);


