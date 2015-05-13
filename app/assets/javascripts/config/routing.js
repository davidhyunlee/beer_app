(function() {

  angular
    .module('BeerApp')
    .config(config)
    .run(run);

    function config($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'home.html',
          controller: 'BeersController',
          controllerAs: 'beers'
        })

        .state('signup', {
          url: '/signup',
          title: 'Sign up',
          templateUrl: 'register.html',
          controller: 'UsersController',
          controllerAs: 'users'
        })

        .state('login', {
          url: '/login',
          title: 'Login',
          templateUrl: 'login.html',
          controller: 'AuthenticationController',
          controllerAs: 'auth'
        });

      $urlRouterProvider
        .otherwise('/login');

    }

    function run($rootScope, $state, $kookies) {

      // Check if access token exists.
      function changeRoute(event, current, previous) {
        $rootScope.title = $state.current.title;
      }

      $rootScope.$on('$stateChangeSuccess', changeRoute);

    }

})();