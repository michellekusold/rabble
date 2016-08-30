(function(){
  'use strict';
  angular.module('rabble.services').factory('navigationServiceFactory', navigationServiceFactory);
  navigationServiceFactory.$inject = ["$rootScope", "$state"];

  function navigationServiceFactory($rootScope, $state){
    function goTo(path){
        $state.go(path);
    }

    return{
      goTo: goTo
    }
  }
})();
