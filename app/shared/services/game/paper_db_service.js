(function(){
  'use strict';
  angular.module('rabble.services').factory('paperDbServiceFactory', paperDbServiceFactory);
  paperDbServiceFactory.$inject = ["$cookies", "$cookieStore"]
  function paperDbServiceFactory($cookies, $cookieStore){
    var fb = firebase.database();

    return{

    }
  }
})();
