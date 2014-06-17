angular
  .module('app')
  .factory('Static', ['$http', function($http) {
    return {
      get: function() {
        return $http.get('json/staticContent.json').then(function(response) {
          return response.data;
        });
      }
    };
  }]);

