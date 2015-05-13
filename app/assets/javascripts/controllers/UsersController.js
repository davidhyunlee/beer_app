(function() {

  angular
    .module('BeerApp')
    .controller('UsersController', UsersController);

    UsersController.$inject = ['$http', '$state'];

    function UsersController($http, $state) {

      var self = this;

      self.signup = function() {
        $http
          .post('/api/v1/users', {
            name: self.name, 
            email: self.email, 
            password: self.password
          })
          .success(function(response) {
            $state.go('login');
          })
          .error(function(response) {
            console.log(response);
          });
      };

    }

})();