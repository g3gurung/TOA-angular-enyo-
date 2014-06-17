angular
  .module('app')
  .factory('Menu', ['$http', function($http) {
    return {
      get: function() {
        return $http.get('json/siteContent.json').then(function(response) {
          return response.data;
        });
      }
    };
  }]);

