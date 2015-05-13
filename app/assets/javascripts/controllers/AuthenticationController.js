(function() {

  angular
    .module('BeerApp')
    .controller('AuthenticationController', AuthenticationController);

  AuthenticationController.$inject = ['$http', '$state', '$kookies'];

  function AuthenticationController($http, $state, $kookies) {

    var self = this;

    function setAuthToken(token) {
      $kookies.set('auth', token, {expires: 7, path: '/'});
    }

    self.isAuthenticated = function() {
      return $kookies.get('auth') ? true : false;
    };

    self.login = function() {
      $http.post('/api/v1/authenticate', {email: self.email, password: self.password}).success(function(response) {
        setAuthToken(response.access_token);
        self.redirectLogin();
      }).error(function(response) {
        console.log(response);
      });
    };

    self.logout = function() {
      $kookies.remove('auth', {path: '/'});
      self.redirectLogin();
    };

    self.redirectLogin = function() {
      (self.isAuthenticated()) ? $state.go('home') : $state.go('login');
    };

  }

})();