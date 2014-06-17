angular
  .module('app')
  .factory('Sushi', ['$http', function($http) {
    return {
      get: function() {
        return $http.get('json/sushi.json').then(function(response) {
          return response.data;
        });
      }
    };
  }]);

