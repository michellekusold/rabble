(function (){
'use strict';
angular.module('rabble', [
  'ui.router',
  'rabble.controllers',
  'rabble.config',
  'rabble.directives',
  "rabble.filters",
  "rabble.models",
  "rabble.services",
  'rabble.version',
  'ngCookies'
]).
config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  configureRoutes($stateProvider, $urlRouterProvider);
}).
run(function($rootScope, navigationServiceFactory){
  $rootScope.nav = navigationServiceFactory;
});

})();
