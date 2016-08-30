(function(){
  'use strict';
  angular.module('rabble.services').factory('humanCodeServiceFactory', humanCodeServiceFactory);
// generate human readable code to be used to enter a game
  function humanCodeServiceFactory(){
    function makeHumanGameCode()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ ){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    return{
      makeHumanReadableGameCode: makeHumanGameCode
    }
  }
})();
